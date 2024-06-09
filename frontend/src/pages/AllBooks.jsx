import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader/Loader'
import axios from 'axios';

import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';


function AllBooks() {
    const [Data, setData] = useState()

    useEffect(() => {
        const fetch = async () => {
            const responese = await axios.get("http://localhost:3000/api/v1/get-all-books")
            setData(responese.data.data);
        }
        fetch();
    }, [])

    return (
        <div className='bg-teal-100 px-12 h-auto py-8'>
            {" "}
            <div className='flex justify-between'>
                <h1 className='text-4xl text-blue-700 font-semibold'>All Books</h1>
                <form>
                    <div className="flex justify-end">
                        <input type="text" placeholder='Search....' className=' border rounded-md pl-10 pr-4 py-2 focus:border-green-500 focus:outline-none focus:shadow-outline' />
                    </div>
                </form>

            </div>
            {!Data && <div className='flex items-center justify-center my-8'>
                <Loader />{" "}
            </div>}
            {/* cards */}
            <div className=' px-4 lg:px24'>
                <div className='grid gap-8 my-12 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1'>
                    {Data && Data.map((item, i) =>
                        <div key={i}>
                            <Link className='no-underline' to={`/view-book-details/${item._id}`}>
                                <Card>
                                    <img src={item.url} alt="" className='h-96' />
                                    <button className='bg-blue-700 font-semibold text-white py-2 rounded'>Buy Now</button>
                                </Card>
                            </Link>

                        </div>)
                    }
                </div>
            </div>

        </div>

    )
}

export default AllBooks

// {
//     Data && Data.map((item, i) =>
//         <SwiperSlide key={i}>
//             <Link className='no-underline' to={"/all-book"}>
//                 <div className='relative'>
//                     <img src={item.url} alt="" />
//                     <div className='absolute top-3 right-3 bg-blue-600 hover:bg-black p-2 rounded'>
//                         <FaCartShopping className="w-4 h-4 text-white" />
//                     </div>
//                     <div className='flex justify-between'>
//                         <h3 className='text-xl text-black font-semibold text-center'>{item.title}</h3>
//                         <p className='mb-0 x-7 text-black font-semibold text-xl'>₹ {item.price}</p>

//                     </div>
//                 </div>
//             </Link>
//         </SwiperSlide>
//     )
// }
