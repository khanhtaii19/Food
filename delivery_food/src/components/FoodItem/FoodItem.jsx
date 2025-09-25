import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/frontend_assets/assets'
import { StoreConText } from '../../context/StoreContext'

const FoodItem = ({id, name, price, description, image}) => {

    const {cartItems, addToCart, removeFromCart}= useContext(StoreConText)
  return (
    <div className='food-item'>
        <div className="food-item-img-container">
            <img className='food-item-img' src={image} alt={name} />
            {!cartItems[id]
                ? <img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt=''></img>
                : <div className='food-item-counter'>
                    <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                    <p>{cartItems[id]}</p>
                    <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
                </div>
            }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating"></div>
            <p>{name}</p>
            <img src={assets.rating_starts} alt="rating" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
    </div>
  )
}

export default FoodItem