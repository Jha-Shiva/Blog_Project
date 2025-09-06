import React, { useEffect, useState } from 'react'
import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from 'flowbite-react'
import { HiArrowCircleRight, HiUserCircle } from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { signoutSuccess } from '../redux/user/userSlice.js'
import { useNavigate } from 'react-router-dom'

const DashSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
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
  return (
    <Sidebar className='w-full md:w-56'>
      <SidebarItems>
        <SidebarItemGroup>
          <Link to="/dashboard?tab=profile" className="no-underline">
            <SidebarItem as={'div'} active={tab === 'profile'} icon={HiUserCircle} label='User' labelColor='dark'>
              Profile
            </SidebarItem>
          </Link>
          <SidebarItem icon={HiArrowCircleRight} className='cursor-pointer mt-3' onClick={handleSignout}> 
            Sign Out
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  )
}

export default DashSidebar