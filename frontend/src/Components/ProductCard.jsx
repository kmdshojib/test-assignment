import React from 'react'
import "../styles/card.styles.scss"

const ProductCard = ({ sku, name, price, children, onChange, value, id }) => {
    return (
        <div key={id} className='card-container card'>
            <div className='d-flex m-2'>
                <input type='checkbox' onChange={onChange} value={value} />
            </div>
            <div className='card-body d-flex flex-column'>
                <h5 className="card-title">{sku}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">{name}</h6>
                <p className="card-text">Price: {price}$</p>
                <div className="card-text">{children}</div>
            </div>
        </div>
    )
}

export default ProductCard;