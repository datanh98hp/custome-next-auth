"use client"
import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
export default function LoginForm() {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState(null)

    const {status} = useSession()
    const router = useRouter()
    if (status === 'authenticated') {
        router.push('/')
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(email, password)
        signIn('credentials', { email, password ,redirect:false})
            .then((res) => {
                if (res.error) {
                    setError('Enail or passwork is wrong !')
                }else{
                    router.push('/')
                }
            })
            // .catch((err) => {
            //     setError('ERROR LOGIN :'+err.message)
            // })
    }
    return (
        <div className='dark:text-black text-white'>
            <h1 className='py-4 text-2xl text-center text-white'>Login</h1>
            <p className={error ? 'text-red-500 text-center' : 'hidden'}>{error}</p>

            <form className=' dark:text-black text-white' onSubmit={handleSubmit}>

                <div className='py-2'>
                    <label htmlFor='email' className=''>Email</label>
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

                <div className='py-2 text-center text-white'>
                    <button className='border p-3 rounded-md'>Login now</button>
                </div>
                <div className='py-2 text-white'>
                    <p>Don't have an account? <Link href='/signup' className='text-blue-500'>Sign up</Link></p>
                </div>
            </form>

            <div className='text-white'>
                <button className='border p-3 rounded-md mr-2' onClick={() => signIn('google',{redirect:false})}>
                    Login with Google
                </button>
                <button className='border p-3 rounded-md ml-2' onClick={() => signIn('github',{redirect:false})}>
                    Login with Github
                </button>
            </div>
        </div >
    )
}
