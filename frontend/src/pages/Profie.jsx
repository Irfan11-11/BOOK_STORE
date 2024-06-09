import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../components/SideBar'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Loader from '../components/Loader/Loader'

function Profie() {
  // const isLoggedIn = useSelector();
  const [Profile, setProfile] = useState()
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const responese = await axios.get(
        "http://localhost:3000/api/v1/get-user-information",
        { headers }
      );
      setProfile(responese.data);
    };
    fetch()
  }, [])

  return (
    <div className='bg-teal-100 px-2 md:px-12 flex flex-col md:flex-row  py-8 gap-4 text-black '>
      {!Profile && <div className='w-full h=[100%] flex items-center justify-center'><Loader/></div>}
      {Profile &&       <>
        <div className='w-full md:w-1/6 h-screen'>
          <SideBar data={Profile}/>
        </div>
        <div className='w-full md:w-5/6'>
          <Outlet />
        </div>
      </>
}
    </div>
  )
}

export default Profie