import React from 'react'
import { useForm } from 'react-hook-form'
import { axiosApi } from '../api/axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

const AddProduct = () => {
    const navigate = useNavigate()
    const addProdduct = async (data) => {
        const result = await axiosApi.post("/postProduct.php", data);
        if ("data" in result) {
            toast.success("Product added successfully");
            navigate("/")
        }
    }

    const mutation = useMutation(data => addProdduct(data));
    const { isLoading, isError, error } = mutation;

    const {
        register,
        handleSubmit,

        formState: { errors },
    } = useForm()
    const onSubmit = (data) => {
        console.log(data)
        mutation.mutate(data)
    }
    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        toast.error("An error has occurred!");
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="sku">Sku</label>
                    <input type="text" name="sku" {...register("sku")} />

                    <label htmlFor="price">price</label>
                    <input type="number" name="price" {...register("price")} />

                    <label htmlFor="sku">Name</label>
                    <input type="text" name="name" {...register("name")} />

                    <label htmlFor="sku">Size</label>
                    <input type="text" name="size" {...register("size")} />

                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddProduct