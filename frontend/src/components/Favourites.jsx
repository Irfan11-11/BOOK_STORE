import axios from 'axios'
import React, { useEffect, useState } from 'react'
import FavouriteCard from './FavouriteCard/FavouriteCard';
import favourite from '../assets/favourite.png';



function Favourites() {
  const [FavouriteBooks, setFavouriteBooks] = useState()
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:3000/api/v1/get-favourite-books", { headers })
      setFavouriteBooks(response.data.data);
    }
    fetch();
  }, [FavouriteBooks])

  return (
    <>
      {FavouriteBooks && FavouriteBooks.length === 0 && (
        <div className='text-5xl font-semibold text-blue-500 flex items-center justify-center flex-col w-full h-[100%]'>
          No Favourite Books!!!
          <img src={favourite} alt="star" className='h-[20vh] my-8' />
          </div>
      )}
      <div className='grid grid-cols-4 gap-4 '>
        {FavouriteBooks && FavouriteBooks.map((item, i) => (
          <div key={i}>
            <FavouriteCard data={item} favourite={true} />
          </div>
        ))}
      </div>

    </>
  )
}

export default Favourites