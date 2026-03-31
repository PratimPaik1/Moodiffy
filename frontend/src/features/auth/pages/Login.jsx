import React, { useState, useEffect } from 'react'
import FormLabel from '../components/FormLabel'
import '../style/form.scss'
import { Link } from 'react-router'
import { useNavigate } from 'react-router'

import { ToastContainer, toast } from 'react-toastify';

import { useAuth } from '../hooks/useAuth'

const Login = () => {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")

  const { handleLogin, loading, user, authChecked } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (authChecked && user) {
      navigate("/")
    }
  }, [authChecked, user, navigate])

  if (loading) {
    return <h1>Loading</h1>
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      if (!userName || userName.trim() === "") {
        return toast.error("User Name is required");
      }
      
      if (password=== "") {
        return toast.error("PASSWORD is required");
      }
      const res = await handleLogin(userName, password)
        
     


      setUserName("")
      setPassword("")

      navigate("/")

    } catch (err) {


      //  console.log(err.message)
       if(err.response && err.response.status === 400){
             return toast.error(err.response.data.message)
       }
      setUserName("")
      setPassword("")
      // console.log(err.response)
      navigate("/Login")
    }
  }

  return (
    <div className='main'>
      <h1 className='heading'>Login</h1>
      <form className='form' onSubmit={handleSubmit}>
        <FormLabel name="Enter user Name  or Email" id="username" value={userName} setValue={setUserName} type="text" />
        <FormLabel name="Enter Password" id="password" value={password} setValue={setPassword} type="password" />
        <button className='submit-btn'>Submit</button>
      </form>
      <p>Don't have an account? <Link className='toggleAuthForm' to="/register">Register</Link></p>

    </div>
  )
}

export default Login
