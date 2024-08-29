'use client'

import { Poppins } from "next/font/google";
import Button from "./Button";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const poppins = Poppins({subsets: ['latin'], weight: ['500']});
const xlPoppins = Poppins({subsets: ['latin'], weight: ['700']})

export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false);
  const [authenticating, setAuthenticating] = useState(false)

  const { signup, login } = useAuth();

  console.log('IS REGISTER ? ',isRegister);
  

  async function handleSubmit() {
    if(!email || !password || password.length < 6) {
      return
    }
    console.log('INSIDE HANDLING THE CLICK');
    

    setAuthenticating(true)
    
    try {
      if(isRegister) {
        console.log('SIGNING UP A NEW ACCOUNT');
        await signup(email, password)
      }
      else {
        console.log('LOGGING IN AN EXISTING ACCOUNT');
        await login(email, password)
        
      }
    } catch (err) {
      console.error(err.message);
    } finally {
      setAuthenticating(false)
    }

  }

  return (
    <div className='flex flex-col flex-1 justify-center items-center gap-4'>
      <h3 className={'text-4xl sm:text-5xl md:6xl ' + xlPoppins.className} >{!isRegister ? 'Login In' : 'Register'}</h3>
      <p className={' ' + poppins.className}>
        {isRegister ? 'You\'re one step away!' : 'Welcome back there!'}
      </p>
      <input onChange={(e) => {
        setEmail(e.target.value)
      }} className={'w-full max-w-[400px] mx-auto px-2 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-3 border border-solid border-indigo-400 rounded-lg border-2 outline-none bg-transparent ' + poppins.className} placeholder='Email'/>
      <input onChange={(e) => {
        setPassword(e.target.value);
      }} className={'w-full max-w-[400px] mx-auto px-2 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-3 border border-solid border-indigo-400 rounded-lg border-2 outline-none bg-transparent ' + poppins.className} placeholder='Password' type='password'/>
      <div className='max-w-[400px] w-full mx-auto'>
        <Button clickHandler={handleSubmit} text={authenticating ? 'Submiting...' : 'Submit'} full/>
      </div>
      <p className={' ' + poppins.className}>
        {isRegister ? 'Already have an account?' : 'Don\'t have an account?'}
        <button onClick={() => setIsRegister(!isRegister)} className={"text-indigo-600 hover:cursor-pointer " + xlPoppins.className}> {isRegister ? 'Sign In' : 'Sign Up'}</button>
      </p>
    </div>
  )
}
