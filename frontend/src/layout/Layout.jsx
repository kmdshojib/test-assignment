import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer'
import "../styles/layout.styles.scss"
const Layout = () => {
    return (
        <div className='layout-container'>
            <div className='outlet'>
                <Outlet />
            </div>
            <Footer className='footer' />
        </div>
    )
}

export default Layout