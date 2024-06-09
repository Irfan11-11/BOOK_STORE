import React from 'react';
import "./index.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function FavouriteCard({ data, favourite }) {
 const navigate =  useNavigate()
  const headers ={
  id: localStorage.getItem("id"),
  authorization: `Bearer ${localStorage.getItem("token")}`,
  bookid : data._id,
};
const handleRemoveBook = async ()=>{
  const responese = await axios.put("http://localhost:3000/api/v1/deleteBookfrom-favorite",{},{headers});
console.log(responese.data.message);
toast.success("Book Removed from Favorite")
setTimeout(() => {
  navigate("/profile")
}, 2000); 

};


  return (
    <div className="card">
      <div className="cover-img relative">
        <Link to={`/view-book-details/${data._id}`}>
          <img className="card-img-top mb-5 mb-md-0 h-[43vh]"
            src={data.url} alt="..." />
        </Link>
        <div className="details absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-2">
          <div className="content">
            <h5>{data.title}</h5>
            <h6>By {data.author}</h6>
            <h4>Price: ₹ {data.price}</h4>
            {favourite &&(
              <button  onClick={handleRemoveBook} className='bg-blue-700 text-black px-4 py-2 rounded border font-semibold '>Remove</button>
            )}
          </div>
        </div>
      </div>
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />
    </div>
  );
}

export default FavouriteCard;
