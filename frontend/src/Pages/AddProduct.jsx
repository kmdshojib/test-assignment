import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { addProdduct, getCategories } from '../api/apiRequests';

const AddProduct = () => {
    const navigate = useNavigate();
    const [type, setType] = useState("");
    const { data, isLoading: categoryIsLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories
    })
    const mutation = useMutation(data => addProdduct(data));
    const { isLoading, isError, status, isSuccess } = mutation;
    console.log({ status, isSuccess })
    const {
        register,
        handleSubmit,

        formState: { errors },
    } = useForm()
    const onSubmit = (data) => {
        mutation.mutate(data)
    }
    useEffect(() => {
        isSuccess && navigate("/")
    }, [isSuccess, navigate])

    if (isLoading && categoryIsLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        toast.error("An error has occurred!");
    }
    const handleTypeChange = (event) => {
        setType(event.target.value);
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="sku">Sku</label>
                    <input type="text" name="sku" {...register("sku")} />

                    <label htmlFor="sku">Name</label>
                    <input type="text" name="name" {...register("name")} />

                    <label htmlFor="price">price</label>
                    <input type="number" name="price" {...register("price")} />


                    <select id="type" onChange={handleTypeChange} required>
                        <option value=""> --Type Switcher-- </option>
                        {data?.data &&
                            data.data.map((item, index) => (
                                <React.Fragment key={index}>
                                    <option>{item.dvd}</option>
                                    <option>{item.book}</option>
                                    <option>{item.furniture}</option>
                                </React.Fragment>
                            ))
                        }
                    </select>

                    {
                        type === "DVD" && (
                            <>
                                <label htmlFor='size'>Size(MB): </label>
                                <input type='number' name='size' placeholder='#size' required {...register("size")} />
                            </>
                        )
                    }
                    {
                        type === "Book" && (
                            <>
                                <label htmlFor='weight'>Weight(KG): </label>
                                <input type='number' name='weight' placeholder='#weight' required {...register("weight")} />
                            </>
                        )
                    }
                    {
                        type === "Furniture" && (
                            <>
                                <label htmlFor='height'>Height(CM): </label>
                                <input id='height' type='number' name='height' placeholder='#Height' required {...register("height")} />

                                <label htmlFor='width'>Width(CM): </label>
                                <input type='number' name='width' placeholder='#Width' required {...register("width")} />

                                <label htmlFor='length'>Length(CM): </label>
                                <input type='number' name='length' placeholder='#length' required {...register("length")} />

                            </>
                        )
                    }

                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddProduct