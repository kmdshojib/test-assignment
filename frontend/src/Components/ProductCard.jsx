import React from 'react'
import "../styles/card.styles.scss"

const ProductCard = ({ sku, name, price, children, isChecked, id, onCardClick }) => {

    const handleCheck = () => {
        if (onCardClick) {
            onCardClick(id);
        }
    };

    return (
        <div onClick={handleCheck} key={id} className={isChecked ? 'card-container bg-danger card' : 'card-container card'}>
            <div className='d-flex p-3'>
                <input
                    type='checkbox'
                    checked={isChecked || false}
                    readOnly
                />
            </div>
            <div className='card-body d-flex flex-column align-items-center'>
                <h5 className="card-title">{sku}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">{name}</h6>
                <p className="card-text">{price}$</p>
                <div className="card-text">{children}</div>
            </div>
        </div>
    )
}

export default ProductCard;