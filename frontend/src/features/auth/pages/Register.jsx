import React, { useState, useEffect } from 'react'
import FormLabel from '../components/FormLabel'
import '../style/form.scss'
import { Link,useNavigate } from 'react-router'

import { useAuth } from '../hooks/useAuth'
const Register = () => {
  const [userName, setUserName] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const navigate=useNavigate()
  const { loading, handelRegister } = useAuth()
 
  if(loading){
    return <h1>loading</h1>
  }
  async function handelSubmit(e) {
    e.preventDefault()
    try{
      if(password!=confirmPassword){
           setPassword("")
      setConfirmPassword("")
     
         return console.log("password not match")
      }
      const response=await handelRegister(userName,email,password)
      console.log(response)
      setUserName("")
      setEmail("")
      setPassword("")
      setConfirmPassword("")
      navigate("/")

    }
    catch(err){
      
      console.log(err)

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