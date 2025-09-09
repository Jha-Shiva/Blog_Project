import React from 'react'
import { Button } from 'flowbite-react';

const CallToAction = () => {
  return (
    <div className='flex border border-teal-500 p-3 justify-center items-center rounded-tl-3xl rounded-br-3xl flex-col sm:flex-row text-center'>
      <div className='flex-1 justify-center flex flex-col'>
        <h2 className='text-2xl'>
          If you wanted your website look like this you can contact me.
        </h2>
        <p className='text-gray-500 my-2'>
          Check out my other project
        </p>
        <a
          href='https://jha-shivam.netlify.app/'
          target='_blank'
          rel='noopener noreferrer'
          className='no-underline'
        >
          <Button
            className='w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:bg-gradient-to-l focus:ring-purple-200 dark:focus:ring-purple-800'
          >
            Shivam jha
          </Button>
        </a>
      </div>
      <div className='flex-1 p-7'>
        <img src='https://wallpaperaccess.com/full/3239444.jpg' />
      </div>
    </div>
  )
}

export default CallToAction