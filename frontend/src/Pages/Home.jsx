import React from 'react'
import { axiosApi } from '../api/axios'
import { useQuery } from "@tanstack/react-query"



const Home = () => {
    const fetchProduct = async () => {
        const result = await axiosApi.get("/getProducts.php");
        return result.data;
    }
    const { data, isLoading } = useQuery({ queryKey: ["products"], queryFn: fetchProduct })
    if (isLoading) {
        return <div>isLoading..</div>
    }
    console.log(data)
    return (
        <div>Home</div>
    )
}

export default Home