import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { addProdduct, getCategories } from '../api/apiRequests';
import Form from 'react-bootstrap/Form';
import "../styles/addproduct.scss"

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
            <div >
                <form className='d-flex justify-content-center mt-3' onSubmit={handleSubmit(onSubmit)}>
                    <div className='form-container'>
                        <div className='input-container'>
                            <label className='input-label' htmlFor="sku">Sku:</label>
                            <input className='form-input' type="text" name="sku" placeholder='#SKU' {...register("sku")} />
                        </div>

                        <div className='input-container'>
                            <label className='input-label' htmlFor="name">Name: </label>
                            <input className='form-input' type="text" name="name" placeholder='#Name' {...register("name")} />
                        </div>

                        <div className='input-container'>
                            <label className='input-label' htmlFor="price">Price:</label>
                            <input className='form-input' type="number" name="price" placeholder='#Price' {...register("price")} />
                        </div>


                        <Form.Select className='form-option' id="type" onChange={handleTypeChange} required>
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
                        </Form.Select>

                        {
                            type === "DVD" && (
                                <div className='input-container'>
                                    <label className='input-label' htmlFor='size'>Size(MB): </label>
                                    <input className='form-input' type='number' name='size' placeholder='#Size' required {...register("size")} />
                                </div>
                            )
                        }
                        {
                            type === "Book" && (
                                <div className='input-container'>
                                    <label className='input-label' htmlFor='weight'>Weight(KG): </label>
                                    <input className='form-input' type='number' name='weight' placeholder='#Weight' required {...register("weight")} />
                                </div>
                            )
                        }
                        {
                            type === "Furniture" && (
                                <div>
                                    <div className='input-container'>
                                        <label className='input-label' htmlFor='height'>Height(CM): </label>
                                        <input className='form-input' id='height' type='number' name='height' placeholder='#Height' required {...register("height")} />
                                    </div>

                                    <div className='input-container'>
                                        <label className='input-label' htmlFor='width'>Width(CM): </label>
                                        <input className='form-input' type='number' name='width' placeholder='#Width' required {...register("width")} />
                                    </div>

                                    <div className='input-container'>
                                        <label className='input-label' htmlFor='length'>Length(CM): </label>
                                        <input className='form-input' type='number' name='length' placeholder='#Length' required {...register("length")} />

                                    </div>
                                </div>
                            )
                        }

                        <button className='button mt-3 rounded btn btn-light border border-dark' type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddProduct