import React, { useEffect } from 'react'
import Home from './pages/Home'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer'
import { Routes, Route } from 'react-router-dom'
import AllBooks from './pages/AllBooks'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Cart from './pages/Cart'
import Profie from './pages/Profie'
import ViewBookDetails from './components/viewbookDetals/ViewBookDetails'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from './store/auth'
import Favourites from './components/Favourites'
import UserOrderHistory from './components/UserOrderHistory'
import Settings from './components/Settings'

function App() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role)

  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }

  }, [])

  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/all-Books' element={<AllBooks />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/profile' element={<Profie />} >
        <Route index element={<Favourites/>}/>
        <Route path='/profile/orderHistory' element={<UserOrderHistory/>}/>
        <Route path='/profile/settings' element={<Settings/>}/>
        </Route>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/view-book-details/:id' element={<ViewBookDetails />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App