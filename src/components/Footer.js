import React from 'react'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer className='w-full bg-[rgba(0,0,0,0.7)] flex flex-col  items-center  py-[3rem]'>
        <div className='w-[80%] text-[1.5rem] py-[2rem]  border-b-2 flex justify-between flex-wrap md:flex-col  text-white my-[2rem] md:my-[1rem]'>
            <Link className='text-[2.5rem] text-[#8034eb]' to={`/`} >Blog</Link>
            <ul className='w-[40%] flex gap-6 md:w-[60%]'>
                <li><Link to={`/`} className="hover:text-[#8034eb]">  Home </Link></li>
                <li><Link to={`/blogs`}  className="hover:text-[#8034eb]">  Blog </Link></li>
                <li><Link to={`/profile`} className="hover:text-[#8034eb]" >  About me </Link></li>
            </ul>
        </div>
        <div className='w-[10%] md:w-[50%] h-[50%] flex items-center gap-5'>
        <button className="h-12 w-12 flex items-center justify-center hover:bg-white rounded-full border-[#8034eb] border duration-[200ms] transition-[background-color] "><FaFacebookF  className=' w-8 h-8 fill-[#8034eb]'/></button>
        <button className="h-12 w-12 flex items-center justify-center hover:bg-white rounded-full border-[#8034eb] border "><FaTwitter className='w-8 h-8 fill-[#8034eb]' /></button>
        <button className="h-12 w-12 flex items-center justify-center hover:bg-white rounded-full border-[#8034eb] border "><FaInstagram className='w-8 h-8 fill-[#8034eb]'/></button>
        <button className="h-12 w-12 flex items-center justify-center hover:bg-white rounded-full border-[#8034eb] border "><FaLinkedinIn className='w-8 h-8 fill-[#8034eb]'/></button>
    </div> 
        <p className='text-[1.2rem] text-white my-4'>  &copy;Copyright,<span>All right reserved</span> </p>
    </footer>
  )
}
