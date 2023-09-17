import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { addProdduct, getCategories } from '../api/apiRequests';
import Form from 'react-bootstrap/Form';
import "../styles/addproduct.styles.scss"
import Header from './../Components/Header';

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

    if (isLoading || categoryIsLoading) {
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
                <Header title="Add Product">
                    <button className='button rounded btn btn-light border border-dark me-3' type="submit">Submit</button>
                    <button onClick={() => navigate("/")} className='button rounded btn btn-danger'>Cancel</button>
                </Header>
                <div className='d-flex justify-content-center mt-3'>
                    <div className='form-container'>
                        <div className='input-container'>
                            <label className='input-label' htmlFor="sku">Sku:</label>
                            <input className='form-input' type="text" name="sku" placeholder='#SKU' {...register("sku", { required: true })} />
                        </div>
                        {errors.sku && <span className='text-danger'>Sku is required!</span>}

                        <div className='input-container'>
                            <label className='input-label' htmlFor="name">Name: </label>
                            <input className='form-input' type="text" name="name" placeholder='#Name' {...register("name", { required: true })} />
                        </div>
                        {errors.name && <p className='text-danger'>Name is required!</p>}
                        <div className='input-container'>
                            <label className='input-label' htmlFor="price">Price:</label>
                            <input className='form-input' type="number" name="price" placeholder='#Price' {...register("price", { required: true })} />
                        </div>
                        {errors.price && <p className='text-danger'>Price is required!</p>}

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
                                <>
                                    <div className='input-container'>
                                        <label className='input-label' htmlFor='size'>Size(MB): </label>
                                        <input className='form-input' type='number' name='size' placeholder='#Size'  {...register("size", { required: true })} />
                                    </div>
                                    {errors.size && <p className='text-danger'>Size is required!</p>}
                                </>
                            )
                        }
                        {
                            type === "Book" && (
                                <>
                                    <div className='input-container'>
                                        <label className='input-label' htmlFor='weight'>Weight(KG): </label>
                                        <input className='form-input' type='number' name='weight' placeholder='#Weight'  {...register("weight", { required: true })} />
                                    </div>
                                    {errors.weight && <p className='text-danger'>Weight is required!</p>}
                                </>
                            )
                        }
                        {
                            type === "Furniture" && (
                                <div>
                                    <div className='input-container'>
                                        <label className='input-label' htmlFor='height'>Height(CM): </label>
                                        <input className='form-input' id='height' type='number' name='height' placeholder='#Height'  {...register("height", { required: true })} />
                                    </div>
                                    {errors.height && <p className='text-danger'>Height is required!</p>}
                                    <div className='input-container'>
                                        <label className='input-label' htmlFor='width'>Width(CM): </label>
                                        <input className='form-input' type='number' name='width' placeholder='#Width'  {...register("width", { required: true })} />
                                    </div>
                                    {errors.width && <p className='text-danger'>Width is required!</p>}
                                    <div className='input-container'>
                                        <label className='input-label' htmlFor='length'>Length(CM): </label>
                                        <input className='form-input' type='number' name='length' placeholder='#Length'  {...register("length", { required: true })} />
                                    </div>
                                    {errors.length && <p className='text-danger'>Length is required!</p>}

                                </div>
                            )
                        }
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddProduct