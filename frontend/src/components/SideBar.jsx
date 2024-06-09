import React from 'react'
import { FaArrowRightFromBracket } from 'react-icons/fa6'
import { Link } from 'react-router-dom'


function SideBar({ data }) {
    return (
        <div className='bg-blue-400 p-4 rounded flex flex-col items-center justify-between h-[100%]'>
            <div className='flex items-center flex-col justify-center'>
                {" "}
                <img src={data.avatar} alt="" className='h-[12vh]' />
                <p className='mt-3 text-xl font-semibold'>{data.username}</p>
                <p className='mt-1 text-normal'>{data.email}</p>
                <div className='w-full mt-2 h-[1px] bg-black hidden lg:block'></div>
            </div>

            <div className='w-full flex-col items-center justify-center hidden lg:flex'>
                <Link to="/profile" className='font-semibold w-full py-2 text-center hover:bg-blue-700 rounded transition-all duration-300 no-underline'>
                    Favourites
                </Link>
                <Link to="/profile/orderHistory" className='font-semibold w-full py-2 mt-4 text-center hover:bg-blue-700 rounded transition-all duration-300 no-underline'>
                    Order History
                </Link>
                <Link to="/profile/settings" className='font-semibold w-full py-2 mt-4 text-center hover:bg-blue-700 rounded transition-all duration-300 no-underline'>
                    Settings
                </Link>
            </div>
            <button className='bg-blue-700 w-3/6 lg:w-full mt-4 lg:mt-0 text-black font-semibold flex items-center justify-center rounded py-2'>
                LogOut <FaArrowRightFromBracket className='ms-4' />
            </button>
        </div>
    )
}

export default SideBar