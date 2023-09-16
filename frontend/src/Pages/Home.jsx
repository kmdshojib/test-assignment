import React from 'react'

import { useQuery } from "@tanstack/react-query"
import { getProducts } from '../api/apiRequests'



const Home = () => {

    const { data, isLoading } = useQuery({ queryKey: ["products"], queryFn: getProducts })

    if (isLoading) {
        return <div>isLoading..</div>
    }

    console.log(data)

    return (
        <div>Home</div>
    )
}

export default Home