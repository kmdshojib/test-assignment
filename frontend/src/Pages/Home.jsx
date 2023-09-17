import React, { useEffect, useState } from 'react'

import { useMutation, useQuery } from "@tanstack/react-query"
import { deleteProduct, getProducts } from '../api/apiRequests'
import ProductCard from '../Components/ProductCard'
import "../styles/home.styles.scss"
import Header from '../Components/Header'
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate();
    const { data, isLoading, refetch } = useQuery({ queryKey: ["products"], queryFn: getProducts })
    const [ids, setIds] = useState([])
    const [checkedStates, setCheckedStates] = useState(data?.data ? Array.from({ length: data?.data.length }, () => false) : []);

    const mutation = useMutation((id) => deleteProduct(id))
    const { isLoading: isDeleting, isSuccess, isError } = mutation

    useEffect(() => {
        if (isSuccess) {
            refetch()
            setCheckedStates(false)
        }
    }, [isSuccess, refetch])

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


    const handleDelete = () => {
        if (ids.length > 0) {
            const idArr = ids.map(id => parseInt(id.trim(), 10));
            const data = {
                ids: idArr
            };
            console.log(data);
            mutation.mutate(data);
        }
    }
    if (isLoading || isDeleting) {
        return <div>isLoading..</div>
    }

    return (
        <div>
            <Header title="Product List">
                <div>
                    <button
                        onClick={() => navigate("/addproduct")}
                        style={{ width: "100px" }}
                        className='btn btn-light button border border-dark me-3'>Add</button>
                    <button onClick={handleDelete} className='btn btn-danger button'>Mass Delete</button>
                </div>
            </Header>
            {data?.data ?
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
                : <div className='d-flex justify-content-center text-danger fw-medium mt-5'> No Product Found Please Add Product!</div>
            }
        </div>
    )
}

export default Home