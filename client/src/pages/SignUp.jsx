import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left */}
        <div className='flex-1 '>
          <Link
          to="/"
          className="font-bold dark:text-white text-4xl" id='blog-name'
          >
            <span className="px-3 py-1 bg-gradient-to-r from-red-500 via-amber-600 border-t-rose-700 rounded-lg text-white/70 hover:text-white ">
              Echo
            </span>{" "}
            Blog
          </Link>
          <p className='text-sm mt-5'>
            This is a blog project. You can sign in with your email and password or with Google.
          </p>
        </div>
        
        {/* right */}
        <div className='flex-1 shadow-xl p-6 rounded-xl'>
          <form action="" className='flex flex-col gap-4'>
            <div>
              <Label htmlFor='username'>Your username</Label>
              <TextInput id='username' type='text' name='username' placeholder='username' required/>
            </div>

            <div>
              <Label htmlFor='email'>Your email</Label>
              <TextInput id='email' type='email' name='email' placeholder='example@gmail.com' required/>
            </div>
            
            <div>
              <Label htmlFor='password'>Your password</Label>
              <TextInput id='password' type='password' name='password' placeholder='password' required/>
            </div>

            <Button
              className='bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:bg-gradient-to-l focus:ring-purple-200 dark:focus:ring-purple-800'
              type='submit'
            >
              Sign Up
            </Button>

          </form>

          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account ?</span>
            <Link to={'/sign-in'}
              className='text-blue-600'
            >
              Sign In
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default SignUp