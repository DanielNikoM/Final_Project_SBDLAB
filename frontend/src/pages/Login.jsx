import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginImg from '../assets/login.jpg';

export function Login() {
    return (
      <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
          <div className='hidden sm:block'>
              <img className='w-full h-full object-cover' src={loginImg} alt="" />
          </div>
  
          <div className='bg-gray-100 flex flex-col justify-center'>
              <form className='max-w-[400px] w-full mx-auto bg-white p-4'>
                  <h2 className='text-4xl font-bold text-center py-6'>Welcome!</h2>
                  <div className='flex flex-col py-2'>
                      <label>Username</label>
                      <input className='border p-2' type="text" />
                  </div>
                  <div className='flex flex-col py-2'>
                      <label>Password</label>
                      <input className='border p-2' type="password" />
                  </div>
                  <button className='border w-full my-5 py-2 bg-black hover:bg-gray-600 text-white'>Log in</button>
                  <div className='text-center mt-2 mb-4'>
                <p> Don't have an account? <Link to="/register"><strong>Register</strong></Link></p>
              </div>
              </form>
          </div>
      </div>
    )
  }