import React, { useState, useEffect } from 'react'
import FormLabel from '../components/FormLabel'
import '../style/form.scss'
import { Link, useNavigate } from 'react-router'

import { toast } from 'react-toastify';

import { useAuth } from '../hooks/useAuth'
const Register = () => {
  const [userName, setUserName] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const navigate = useNavigate()
  const { loading, handelRegister } = useAuth()

  if (loading) {
    return <h1>loading</h1>
  }
  async function handelSubmit(e) {
    e.preventDefault()
    try {


      if (!userName || userName.trim() === "") {
        return toast.error("User Name is required");
      }

      if (!email || email.trim() === "") {
        return toast.error("Email is required");
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        return toast.error("Invalid email format");
      }
      const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;


      if (!password) {
        return toast.error("Password is required");
      }

      if (!passwordRegex.test(password)) {
        return toast.error(
          "Password must be at least 8 characters, include 1 uppercase and 1 special character"
        );
      }

      if (!confirmPassword) {
        return toast.error("Confirm Password is required");
      }

      if (password !== confirmPassword) {
        return toast.error("Passwords do not match");
      }
      const response = await handelRegister(userName, email, password)
      console.log(response)
      setUserName("")
      setEmail("")
      setPassword("")
      setConfirmPassword("")
      navigate("/")

    }
    catch (err) {
  console.log(err);

  const status = err.response?.status;
  const message = err.response?.data?.message;

  if (status === 409) {
    return toast.error(message || "User already exists");
  }

  if (status === 400) {
    return toast.error(message || "Invalid input");
  }

  if (status === 500) {
    return toast.error("Server error, try again later");
  }

  // fallback
  toast.error(message || "Something went wrong");
}


  }

  return (
    <div className='main'>
      <h1 className='heading'>Register</h1>
      <form className='form' onSubmit={handelSubmit}>
        <FormLabel name="Enter user Name " id="username" value={userName} setValue={setUserName} type="text" />
        <FormLabel name="Enter email " id="email" value={email} setValue={setEmail} type="email" />
        <FormLabel name="Enter Password" id="password" value={password} setValue={setPassword} type="password" />
        <FormLabel name="Confirm Password" id="confirmPassword" value={confirmPassword} setValue={setConfirmPassword} type="password" />

        <button className='submit-btn'>Register</button>
      </form>
      <p>have an account? <Link className='toggleAuthForm' to="/login">Login</Link></p>

    </div>
  )
}

export default Register