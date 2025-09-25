import React, { useContext, useState } from "react";
import './Navbar.css'
import { assets, food_list } from "../../assets/frontend_assets/assets";
import { Link } from "react-router-dom";
import { StoreConText } from "../../context/StoreContext";
const Navbar = ({setShowLogin}) =>{
    const [menu, setMenu] = useState("menu")
    const {getTotalCartAmount} = useContext(StoreConText)

    const [showSearch, setShowSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredFood = food_list.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return(<>
        <div className="navbar">
            <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
            <ul className="navbar-menu">
                <Link to='/' onClick={()=> setMenu("home")} className={menu==="home"?"active":""}>Home</Link>
                <a href="#explore-menu" onClick={()=> setMenu("menu")} className={menu==="menu"?"active":""}>Menu</a>
                <a href="#app-download" onClick={()=> setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>Mobile-App</a>
                <a href="#footer" onClick={()=> setMenu("contact-us")} className={menu==="contact-us"?"active":""}>Contact Us</a>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="search" className="search-btn" onClick={()=> setShowSearch(prev => !prev)} style={{cursor: "pointer"}} />
                {showSearch && (
                    <div className="search-bar">
                    <input type="text" placeholder="Search about food..."  value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                {searchTerm && (
                    <ul className="search-results">
                        {filteredFood.length > 0 ? (filteredFood.map((item, index) => (
                             <li key={index}  onClick={() => {
                setShowSearch(false); // đóng search sau khi chọn
                setSearchTerm(""); // clear input
              }}>{item.name}</li>
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
                    <div className={getTotalCartAmount()===0?"":"dot"}></div>
                </div>
                <button onClick={()=>setShowLogin(true)}>Sign In</button>
            </div>
        </div>
      

    </>)
}
export default Navbar;