import React from 'react'
import { Footer, FooterCopyright, FooterDivider, FooterIcon, FooterLink, FooterLinkGroup, FooterTitle } from 'flowbite-react'
import {  BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import { Link } from 'react-router-dom';

const FooterCom = () => {
  return (
    <Footer container className="border border-t-8 border-t-blue-500 dark:bg-gray-900 dark:text-white ">
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
          {/* Logo */}
          <div className='mt-5'>
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-2xl font-semibold dark:text-white"
              id="blog-name"
            >
              <span className="px-3 py-1 bg-gradient-to-r from-red-500 via-amber-600 border-t-rose-700 rounded-lg text-white/70 hover:text-white ">
                Echo
              </span>{" "}
              Blog
            </Link>
          </div>

          <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
            <div>
              <FooterTitle title="about" />
                <FooterLinkGroup col>
                  <FooterLink as={'div'}>
                    <Link to='https://jha-shivam.netlify.app/' target='_blank' className='md:text-md text-sm'>About Me</Link>
                  </FooterLink>
                  <FooterLink as={'div'}>
                    <Link to='/about' className='md:text-md text-sm'>About This Blog</Link>
                  </FooterLink>
                </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="follow us" />
                <FooterLinkGroup col>
                  <FooterLink as={'div'}>
                    <Link to='https://github.com/Jha-Shiva' target='_blank' className='md:text-md text-sm'>Github</Link>
                  </FooterLink>
                  <FooterLink as={'div'}>
                    <Link to='https://www.linkedin.com/in/shivam-jha-294636318/' className='md:text-md text-sm'>Linkedin</Link>
                  </FooterLink>
                </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="legal" />
                <FooterLinkGroup col>
                  <FooterLink as={'div'}>
                    <Link to='#' target='_blank' className='md:text-md text-sm'>Privacy Policy</Link>
                  </FooterLink>
                  <FooterLink as={'div'}>
                    <Link to='#' className='md:text-md text-sm'>Terms & Conditions</Link>
                  </FooterLink>
                </FooterLinkGroup>
            </div>
          </div>
        </div>

        <FooterDivider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <FooterCopyright href="#" by="shivam jha™" year={2025} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <FooterIcon href="#" icon={BsFacebook} />
            <FooterIcon href="#" icon={BsInstagram} />
            <FooterIcon href="#" icon={BsTwitter} />
            <FooterIcon href="https://github.com/Jha-Shiva" icon={BsGithub} />
          </div>
        </div>
      </div>
    </Footer>
  );
}

export default FooterCom