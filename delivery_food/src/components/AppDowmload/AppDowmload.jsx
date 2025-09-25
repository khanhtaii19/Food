import React from 'react'
import './AppDowmload.css'
import { assets } from '../../assets/frontend_assets/assets'
const AppDowmload = () => {
  return (
    <div className='app-download' id='app-download'>
        <p>For Better Experience Download <br />Food App</p>
        <div className="app-download-platform">
            <img src={assets.play_store} alt="" />
            <img src={assets.app_store} alt="" />
        </div>
    </div>
  )
}

export default AppDowmload