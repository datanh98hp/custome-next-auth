"use client"

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function RegisterForm() {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response.error)
        console.log(response.status)
        if (response.status===400) {
            setError("Email already exist")
        }else{
            router.push('/')
        }
       

    }
    // ///
    return (
        <div className='dark:text-black text-white'>
            <h1 className='py-4 text-2xl text-center text-white'>Register</h1>
            <p className={error ? 'text-red-500 text-center' : 'hidden'}>{error}</p>
            <form className=' dark:text-black text-white' onSubmit={handleSubmit}>
                <div className='py-2'>
                    <label htmlFor='name' className=''>Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder='Enter your name'
                    />
                </div>
                <div className='py-2'>
                    <label htmlFor='email' className=''>Name</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder='Enter your email'
                    />
                </div>
                <div className='py-2'>
                    <label htmlFor='password' className=''>Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder='Enter your password'
                    />
                </div>

                <div className='py-2 text-center'>
                    <button className='border p-3 rounded-md'>Register now</button>
                </div>
            </form>
        </div >
    )
}
