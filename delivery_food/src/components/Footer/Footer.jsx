import React from 'react'
import './Footer.css'
import { assets } from '../../assets/frontend_assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>Providing high-quality meals with fresh ingredients and exceptional service. We are committed to delivering taste and satisfaction in every order.</p>
                <div className="footer-social-icon">
                    <a href="https://www.facebook.com/khanhtai.pham.578" target='blank'><img src={assets.facebook_icon} alt="" /></a>    
                    <img src={assets.twitter_icon} alt="" />
                    <a href="https://www.linkedin.com/in/ph%E1%BA%A1m-kh%C3%A1nh-t%C3%A0i-a40973288/" target='blank'><img src={assets.linkedin_icon} alt="" /></a>
                </div>
            </div>
            <div className="footer-content-center">
                <h2>Company</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>Get In Touch</h2>
                <ul>
                    <li>+84-948-247-758</li>
                    <li>phamkhanhtaii@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">Copyright 2025 - All right deserved</p>
    </div>
  )
}

export default Footer