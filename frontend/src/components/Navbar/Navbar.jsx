import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Navbar() {
    const links = [
        {
            title: "Home",
            link: "/",
        },
        {

            title: "All Books",
            link: "/all-books",
        },

        {

            title: "Cart",
            link: "/cart",
        },
        {

            title: "Profile",
            link: "/profile",
        },
    ];

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    if (isLoggedIn === false) {
        links.splice(2, 2);
    }
    return (
        <div className="flex bg-blue-400 text-white px-8 py-2 items-center justify-between">
            <Link to={"/"} className="flex items-center no-underline">
                <h1 className="text-2xl font-bold">My Books</h1>
            </Link>
            <div className='nav-links-mybooks flex items-center gap-4 '>
                <div className='flex gap-4 px-11 '>
                    {links.map((items, i) => (
                        <div className='flex items-center font-semibold'>
                            {items.title === "Profile" ? (<Link to={items.link} className='px-4 py-1 border-zinc-500 border rounded hover:bg-blue-950 hover:text-white transition-all duration-300 no-underline' key={i}>{items.title}</Link>) :( <Link to={items.link} className='hover:text-blue-500 transition-all duration-300 no-underline' key={i}>{items.title}{""}</Link>
                        )}
                        </div>
                    ))}
                </div>
                {isLoggedIn === false && <div className='flex gap-3 '>
                    <Link to={"/login"} className='px-4 py-1 border-blue-500 border rounded hover:bg-blue-950 transition-all duration-300 no-underline'>LogIn</Link>
                    <Link to={"/signup"} className='px-4 py-1 bg-blue-800 text-white rounded  hover:bg-blue-950 transition-all duration-300] no-underline'>SignUp</Link>
                </div>
                }
            </div>
        </div>
    )
}

export default Navbar