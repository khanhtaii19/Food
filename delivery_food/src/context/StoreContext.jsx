import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { food_list as staticFoodList } from "../assets/frontend_assets/assets";

export const StoreConText = createContext(null);

const StoreConTextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    // Khởi tạo bằng danh sách tĩnh để UI có dữ liệu ngay cả khi backend chưa trả
    const [food_list, setFoodList] = useState(staticFoodList || []);
    
    // URL của backend
    const url = "http://localhost:4000";

    const addToCart = async (itemId) => {
        // optimistic update nhưng rollback khi backend fail
        setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));

        // Nếu user đã login, sync với backend
        if (token) {
            try {
                // fire-and-forget sync; keep optimistic update for snappy UX
                await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
            } catch (err) {
                // Keep optimistic update to avoid immediate UI revert on transient errors.
                // Log the error so developers can see sync failures. Consider adding a
                // user-visible notification or a background retry queue if needed.
                console.error("Error syncing addToCart:", err);
            }
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            const current = prev[itemId] || 0;
            if (current <= 1) {
                const { [itemId]: _, ...rest } = prev;
                return rest;
            }
            return { ...prev, [itemId]: current - 1 };
        });

        // Nếu user đã login, sync với backend (no rollback for now)
        if (token) {
            try {
                await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
            } catch (err) {
                console.error("Error syncing removeFromCart:", err);
            }
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    // Lấy danh sách món ăn từ backend
    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url + "/api/food/list");
            const remote = response.data.data || [];
            // Nếu backend có dữ liệu, dùng dữ liệu đó; nếu rỗng, giữ danh sách tĩnh
            if (remote.length > 0) setFoodList(remote);
            else setFoodList(staticFoodList || []);
        } catch (error) {
            console.error("Error fetching food list:", error);
            // Khi lỗi (network/offline), dùng danh sách tĩnh
            setFoodList(staticFoodList || []);
        }
    };

    // Lấy giỏ hàng từ backend khi user login
    const loadCartData = async (token) => {
        try {
            const response = await axios.post(
                url + "/api/cart/get", 
                {}, 
                { headers: { token } }
            );
            setCartItems(response.data.cartData);
        } catch (error) {
            console.error("Error loading cart:", error);
        }
    };

    // Load data khi component mount
    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            
            // Kiểm tra xem user đã login chưa
            const savedToken = localStorage.getItem("token");
            if (savedToken) {
                setToken(savedToken);
                await loadCartData(savedToken);
            }
        }
        loadData();
    }, []);

    // Khi token thay đổi (login/logout), load lại cart và danh sách món nếu cần
    useEffect(() => {
        if (token) {
            // load cart and optionally refresh food list from backend
            loadCartData(token);
            fetchFoodList();
        }
    }, [token]);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    };

    return (
        <StoreConText.Provider value={contextValue}>
            {props.children}
        </StoreConText.Provider>
    );
};

export default StoreConTextProvider;