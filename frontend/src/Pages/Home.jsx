import React, { useEffect, useState } from 'react'

import { useMutation, useQuery } from "@tanstack/react-query"
import { deleteProduct, getProducts } from '../api/apiRequests'
import ProductCard from '../Components/ProductCard'
import "../styles/home.styles.scss"
import Header from '../Components/Header'
import { useNavigate } from 'react-router-dom';
import useTitle from '../Hooks/useTitle'
import Spinner from '../Components/Spinner'


const Home = () => {
    useTitle("Poduct List")
    const navigate = useNavigate();
    const { data, isLoading, refetch } = useQuery({ queryKey: ["products"], queryFn: getProducts })
    const [checkedStates, setCheckedStates] = useState(data?.data ? Array.from({ length: data?.data.length }, () => false) : []);
    const [ids, setIds] = useState([]);

    const mutation = useMutation((id) => deleteProduct(id))
    const { isLoading: isDeleting, isSuccess } = mutation

    useEffect(() => {
        if (isSuccess) {
            refetch()
            setCheckedStates([])
        }
    }, [isSuccess, refetch])

    const handleCardClick = (index, id) => {
        const updatedStates = [...checkedStates];
        updatedStates[index] = !updatedStates[index];
        setCheckedStates(updatedStates);

        if (updatedStates[index]) {
            setIds(prevValue => [...prevValue, id]);
        } else {
            setIds(prevValue => prevValue.filter(item => item !== id));
        }
    };


    const handleDelete = () => {
        if (ids.length > 0) {
            const idArr = ids.map(id => parseInt(id.trim(), 10));
            const data = {
                ids: idArr
            };
            mutation.mutate(data);
        }
    }
    if (isLoading || isDeleting) {
        return <>
            <Header title="Product List"></Header>
            <Spinner />
        </>
    }

    return (

        <div>
            <Header title="Product List">
                <div>
                    <button
                        onClick={() => navigate("/addproduct")}
                        style={{ width: "100px" }}
                        className='btn btn-light button border border-dark me-3 rounded'>Add</button>
                    <button onClick={handleDelete} className='btn btn-danger button rounded'>Mass Delete</button>
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
                                    item.size && <div><span className='fw-medium'>Size: </span>{item.size}MB</div>
                                }
                                {
                                    item.weight && <div><span className='fw-medium'>Weight: </span> {item.weight} KG</div>
                                }
                                {
                                    (item.height && item.width && item.length) && <div><span className='fw-medium'>Dimension:  </span>{item.width} × {item.height} × {item.length}</div>
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