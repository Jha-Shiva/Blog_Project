import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineSearch } from "react-icons/ai";
import { Avatar, Button, DarkThemeToggle, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar, NavbarCollapse, NavbarLink, NavbarToggle, TextInput } from 'flowbite-react'
import { useSelector, useDispatch } from 'react-redux';
import {toggleTheme} from '../redux/theme/themeSlice.js'
import {   signoutSuccess } from '../redux/user/userSlice.js';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const path = useLocation().pathname;
  const {currentUser} = useSelector((state)=>state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
        try {
          const res = await fetch("/api/user/signout", {
            method: "POST",
          });
          const data = await res.json();
          if (res.status === 401) {
            dispatch(signoutSuccess());
            navigate("/sign-in");
            return;
          }
          if (!res.ok) {
            console.log(data.message);
          } else {
            dispatch(signoutSuccess());
            navigate("/sign-in");
          }
        } catch (error) {
          console.log(error.message);
        }
      };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
 
  return (
    <Navbar fluid className="shadow-xl">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-2xl font-semibold dark:text-white" id='blog-name'
      >
        <span className="px-3 py-1 bg-gradient-to-r from-red-500 via-amber-600 border-t-rose-700 rounded-lg text-white/70 hover:text-white ">
          Echo
        </span>{" "}
        Blog
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <Button className="lg:hidden text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4
      focus:ring-gray-100 font-medium rounded-full text-sm me-2 mb-2 dark:bg-gray-800 dark:text-white
      dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" >
        <AiOutlineSearch />
      </Button>

      <div className='flex md:order-2 gap-2'>
        
        <DarkThemeToggle 
          onClick={()=>dispatch(toggleTheme())}
          className='hidden text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4
        focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 
        dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 sm:inline'/>

        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={ <Avatar
            alt ='user'
            img={currentUser?.rest?.profilePicture || currentUser?.user?.profilePicture}
            rounded
            />}
          >
            <DropdownHeader>
              <span className='block text-sm'>@{currentUser?.rest?.username || currentUser.user.username}</span>
              <span className='block text-sm font-medium truncate'>@{currentUser?.rest?.email || currentUser.user.email}</span>
            </DropdownHeader>
            <Link to={'/dashboard?tab=profile'}>
              <DropdownItem>Profile</DropdownItem>
            </Link>
            <DropdownDivider/>
            <DropdownItem onClick={handleSignout}>Sign out</DropdownItem>

          </Dropdown>
        ) : (

          <Link to='/sign-in'>
            <button className=" relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-3xl group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-3xl group-hover:bg-transparent group-hover:dark:bg-transparent">
                Sign In
              </span>
            </button>
          </Link>
        )}

        <NavbarToggle className='w-10 h-10 shadow-sm'/>
      </div>
        <NavbarCollapse>
          <NavbarLink as={'div'} active={path === '/'}>
              <Link to='/' className='md:text-lg text-sm'>Home</Link>
          </NavbarLink>
          <NavbarLink as={'div'} active={path === '/about'}>
              <Link to='/about' className='md:text-lg text-sm'>About</Link>
          </NavbarLink>
          <NavbarLink as={'div'} active={path === '/projects'}>
              <Link to='/projects' className='md:text-lg text-sm'>Projects</Link>
          </NavbarLink>
        </NavbarCollapse>
    </Navbar>
  );
}

export default Header