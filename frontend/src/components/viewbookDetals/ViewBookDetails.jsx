import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loader from '../Loader/Loader';
import { GrLanguage } from "react-icons/gr"
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function ViewBookDetails() {
    const { id } = useParams();
    const [Data, setData] = useState()
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);

    useEffect(() => {
        const fetch = async () => {
            const responese = await axios.get(`http://localhost:3000/api/v1/get-book-by-id/${id}`)
            setData(responese.data.data);
            console.log(responese);
        }
        fetch();
    }, [])
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid:id,
      };
    
    const handleFavourite = async ()=>{
        const responese= await axios.put("http://localhost:3000/api/v1/addBookto-favorite",{},{headers});
        toast.success(responese.data.message);
    }

    const handleCart = async()=>{
        const responese = await axios.put("http://localhost:3000/api/v1/add-to-cart",{},{headers})
        toast.success(responese.data.message);

    }

    return (
        <div className='px-12 py-8 bg-teal-100 flex gap-8'>
            <section className="py-5">
                <div className="container px-4 px-lg-5 my-5">
                    {Data && (
                        <div className="row gx-4 gx-lg-5 align-items-center">
                            <div className="col-md-6">
                                <img width="400px" height="400px" className="card-img-top mb-5 mb-md-0 h-[73vh]"
                                    src={Data.url} alt="..." />
                            </div>
                            <div className="col-md-6">
                                <h1 className="display-5 fw-bolder">{Data.title}</h1>
                                <p className='mt-1'><span className='font-semibold text-ml'>by</span> {Data.author}</p>
                                <p className="lead mt-2 text-xl">
                                    <span className='font-semibold text-ml'>Description : </span>{Data.desc}
                                </p>
                                <p className='flex mt-2 items-center justify-start '>
                                    <GrLanguage className='me-3 font-semibold text-ml' /> {Data.language}
                                </p>
                                <p className='mt-4 text-3xl font-semibold'>
                                    Price : ₹ {Data.price}{" "}
                                </p>
                                {isLoggedIn === true && role === "user" && (
                                    <div className="d-flex justify-content-between">
                                        <button onClick={handleFavourite} className="btn btn-outline-dark flex-shrink-0" type="button">
                                            <i className="fa-solid fa-heart-circle-plus text-danger me-1"></i>
                                            Add to Favourite
                                        </button>
                                        <button onClick={handleCart} className="btn btn-outline-dark flex-shrink-0" type="button">
                                            <i className="fa-solid fa-cart-plus text-success me-1"></i>
                                            Add to cart
                                        </button>
                                    </div>
                                )}

                                {isLoggedIn === true && role === "admin" && (
                                    <div className="d-flex justify-content-between">
                                        <button className="btn btn-outline-dark flex-shrink-0" type="button">
                                        <i class="fa-solid fa-pen-to-square fa-lg me-1 text-info"></i> Edit Book
                                        </button>
                                        <button className="btn btn-outline-dark flex-shrink-0" type="button">
                                        <i class="fa-solid fa-trash fa-lg me-2 text-danger"></i> Delete Book
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                    )}
                    {!Data && <div className='h-screen bg-zinc-900 flex items-center justify-center'><Loader />{" "}</div>}
                </div>
            </section>
            <ToastContainer position='top-center' theme='colored' autoClose={3000} />

        </div>
    )
}

export default ViewBookDetails