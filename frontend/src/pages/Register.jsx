import React from 'react';
import registerImg from '../assets/register.jpg';

export function Register() {
  return (
    <div className='relative w-full h-screen bg-zinc-900/90'>
        <img className='absolute w-full h-full object-cover mix-blend-overlay'src={registerImg} alt="/" />
      <div className='flex justify-center items-center h-full'>
        <form className='max-w-[400px] w-full mx-auto bg-white p-8'>
          <h2 className='text-4xl font-bold text-center py-4'>Register</h2>
          <div className='flex flex-col mb-4'>
            <label>Username</label>
            <input className='border relative bg-gray-100 p-2' type="text" />
          </div>
          <div className='flex flex-col mb-4'>
            <label>Email</label>
            <input className='border relative bg-gray-100 p-2' type="text" />
          </div>
          <div className='flex flex-col mb-4'>
            <label>Password</label>
            <input className='border relative bg-gray-100 p-2' type="password" />
          </div>
          <button className='w-full py-3 mt-4 mb-2 bg-black hover:bg-gray-500 relative text-white'>Register</button>
        </form>
      </div>
    </div>
  );
}
