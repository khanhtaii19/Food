import React, { useContext, useState } from "react";
import './Navbar.css';
import { assets } from "../../assets/frontend_assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreConText } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("menu");
    const { getTotalCartAmount, token, setToken } = useContext(StoreConText);
    const navigate = useNavigate();

    const [showSearch, setShowSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // Lấy danh sách món ăn thực từ context thay vì import tĩnh
    const { food_list } = useContext(StoreConText);

    const filteredFood = (food_list || []).filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    };

    return (
        <div className="navbar">
            <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
            <ul className="navbar-menu">
                <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
                <a href="#explore-menu" onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
                <a href="#app-download" onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile-App</a>
                <a href="#footer" onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact Us</a>
            </ul>
            <div className="navbar-right">
                <img 
                    src={assets.search_icon} 
                    alt="search" 
                    className="search-btn" 
                    onClick={() => setShowSearch(prev => !prev)} 
                    style={{ cursor: "pointer" }} 
                />
                {showSearch && (
                    <div className="search-bar">
                        <input 
                            type="text" 
                            placeholder="Search about food..." 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)} 
                        />
                        {searchTerm && (
                            <ul className="search-results">
                                {filteredFood.length > 0 ? (
                                    filteredFood.map((item, index) => (
                                        <li key={index} onClick={() => {
                                            setShowSearch(false);
                                            setSearchTerm("");
                                        }}>
                                            {item.name}
                                        </li>
                                    ))
                                ) : (
                                    <li>No result found</li>
                                )}
                            </ul>
                        )}
                    </div>
                )}
                <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>

                {!token ? (
                    <button onClick={() => setShowLogin(true)}>Sign In</button>
                ) : (
                    <div className="navbar-profile">
                        <img src={assets.profile_icon} alt="" />
                        <ul className="nav-profile-dropdown">
                            <li onClick={() => navigate('/myorders')}>
                                <img src={assets.bag_icon} alt="" />
                                <p>Orders</p>
                            </li>
                            <hr />
                            <li onClick={logout}>
                                <img src={assets.logout_icon} alt="" />
                                <p>Logout</p>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;