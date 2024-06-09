import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import signup from '../assets/signup.jpeg';
import { FloatingLabel, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Signup() {
  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: ""
  });

  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const submit = async () => {
    try {
      if (Values.username === "" || Values.email === "" || Values.password === "" || Values.address === "") {
        toast.warning("Please fill the form completely");
      } else {
        const response = await axios.post("http://localhost:3000/api/v1/sign-up", Values);
        toast.success("Signup successfull!!!");
        setTimeout(() => {
          navigate("/login");
        }, 1000); 
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during signup.Plese try again later!!");
    }
  };

  return (
    <div className='bg-teal-100'>
      <div style={{ width: '100%', height: '100vh' }} className='d-flex justify-content-center align-items-center'>
        <div className="container w-75">
          <div className="card shadow p-5">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <img className='w-100' src={signup} alt="Auth" />
              </div>
              <div className="col-lg-6">
                <h1 className="fw-bolder mt-2">My Books</h1>
                <h5 className="fw-bolder mt-2">Sign Up to your Account</h5>
                <Form>
                  <FloatingLabel controlId="floatingInputName" label="Username" className="mb-3">
                    <Form.Control name="username" value={Values.username} onChange={change} type="text" placeholder="Username" required />
                  </FloatingLabel>

                  <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                    <Form.Control name="email" value={Values.email} onChange={change} type="email" placeholder="name@example.com" required />
                  </FloatingLabel>

                  <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control name="password" value={Values.password} onChange={change} type="password" placeholder="Password" required />
                  </FloatingLabel>

                  <FloatingLabel controlId="floatingTextarea" label="Address" className="mb-3">
                    <Form.Control name="address" value={Values.address} onChange={change} as="textarea" placeholder="Address" required />
                  </FloatingLabel>

                  <div className='mt-3'>
                    <button type="button" onClick={submit} className='btn btn-primary'>SignUp</button>
                    <p>Already have an account? Click here to <Link className='text-info' to={'/login'}>Login</Link></p>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />
    </div>
  );
}

export default Signup;
