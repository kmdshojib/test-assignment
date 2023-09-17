import React, { useState } from 'react'

import { useQuery } from "@tanstack/react-query"
import { getProducts } from '../api/apiRequests'
import ProductCard from '../Components/ProductCard'
import "../styles/home.styles.scss"


const Home = () => {

    const { data, isLoading } = useQuery({ queryKey: ["products"], queryFn: getProducts })
    const [ids, setIds] = useState([])
    const [checkedStates, setCheckedStates] = useState(Array.from({ length: data?.data.length }, () => false));
    if (isLoading) {
        return <div>isLoading..</div>
    }

    const handleCardClick = (index, id) => {
        const updatedStates = [...checkedStates];
        updatedStates[index] = !updatedStates[index];
        setCheckedStates(updatedStates);

        if (updatedStates[index]) {
            setIds(preValue => [...preValue, id]);
        } else {
            setIds(preValue => preValue.filter(item => item !== id));
        }
    };
    console.log(ids)
    return (
        <div className='product-container'>
            {
                data.data.map((item, index) => (
                    <ProductCard
                        key={item.id}
                        value={item.id}
                        sku={item.sku}
                        name={item.name}
                        price={item.price}
                        isChecked={checkedStates[index]}
                        onCardClick={() => handleCardClick(index, item.id)}
                    >
                        {
                            item.size && <div>Size:{item.size}MB</div>
                        }
                        {
                            item.weight && <div>Weight: {item.weight} KG</div>
                        }
                        {
                            (item.height && item.width && item.length) && <div>Dimension: {item.width} × {item.height} × {item.length}</div>
                        }
                    </ProductCard>
                ))
            }
        </div>
    )
}

export default Home