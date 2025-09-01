import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineSearch } from "react-icons/ai";
import { Button, DarkThemeToggle, Navbar, NavbarCollapse, NavbarLink, NavbarToggle, TextInput } from 'flowbite-react'

const Header = () => {
  const path = useLocation().pathname;
  return (
    <Navbar fluid className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-2xl font-semibold dark:text-white" id='blog-name'
      >
        <span className="px-3 py-1 bg-gradient-to-r from-red-500 via-amber-600 border-t-rose-700 rounded-lg text-white/70 hover:text-white ">
          Echo
        </span>{" "}
        Blog
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button className="lg:hidden text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4
      focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white
      dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" >
        <AiOutlineSearch />
      </Button>
      <div className='flex md:order-2'>
        <DarkThemeToggle className=' text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4
        focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 
        dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 sm:inline'/>

        <Link to='/sign-in'>
          <Button pill>
            Sign In
          </Button>
        </Link>
        <NavbarToggle/>
      </div>
        <NavbarCollapse>
          <NavbarLink as={'div'} active={path === '/'}>
              <Link to='/'>Home</Link>
          </NavbarLink>
          <NavbarLink as={'div'} active={path === '/about'}>
              <Link to='/about'>About</Link>
          </NavbarLink>
          <NavbarLink as={'div'} active={path === '/projects'}>
              <Link to='/projects'>Projects</Link>
          </NavbarLink>
        </NavbarCollapse>
    </Navbar>
  );
}

export default Header