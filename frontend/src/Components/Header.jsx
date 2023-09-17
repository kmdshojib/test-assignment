import React from 'react'
import "../styles/heading.styles.scss"
const Header = ({ title, children }) => {
    return (
        <div className='heading-container'>
            <h4 className='card-title'>{title}</h4>
            <div>
                {children}
            </div>
        </div>
    )
}

export default Header