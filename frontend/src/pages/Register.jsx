import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import registerImg from '../assets/register.jpg';

import { register } from '../actions/Account.action';

export function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        const response = await register(name, email, password);
        if (name === '' || email === '' || password === '') {
            setError('Name, email, and password must be filled');
            return;
        }
        if (response.success) {
            navigate('/login');
        } else {
            setError(response.data.message);
        }
    };

    return (
        <div className='relative w-full h-screen bg-zinc-900/90'>
            <img className='absolute w-full h-full object-cover mix-blend-overlay' src={registerImg} alt="/" />
            <div className='flex justify-center items-center h-full'>
                <form onSubmit={handleRegister} className='max-w-[400px] w-full mx-auto bg-white p-8'>
                    <h2 className='text-4xl font-bold text-center py-4'>Register</h2>
                    {error && <p className='text-red-500 text-center mb-4'>{error}</p>}
                    <div className='flex flex-col mb-4'>
                        <label>Username</label>
                        <input 
                            className='border relative bg-gray-100 p-2' 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                        />
                    </div>
                    <div className='flex flex-col mb-4'>
                        <label>Email</label>
                        <input 
                            className='border relative bg-gray-100 p-2' 
                            type="text" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                    <div className='flex flex-col mb-4'>
                        <label>Password</label>
                        <input 
                            className='border relative bg-gray-100 p-2' 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                    <button className='w-full py-3 mt-4 mb-2 bg-black hover:bg-gray-500 relative text-white'>Register</button>
                </form>
            </div>
        </div>
    );
}
