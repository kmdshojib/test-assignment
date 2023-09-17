import React from 'react'

import { useQuery } from "@tanstack/react-query"
import { getProducts } from '../api/apiRequests'
import ProductCard from '../Components/ProductCard'



const Home = () => {

    const { data, isLoading } = useQuery({ queryKey: ["products"], queryFn: getProducts })

    if (isLoading) {
        return <div>isLoading..</div>
    }

    console.log(data)
    const handleChange = (e) => {
        console.log(e.target.value)
    }
    return (
        <div className='product-container'>
            {
                data.data.map(item => (
                    <ProductCard
                        key={item.id}
                        onChange={handleChange}
                        value={item.id}
                        sku={item.sku}
                        name={item.name}
                        price={item.price}
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