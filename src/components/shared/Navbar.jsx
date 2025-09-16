"use client";

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

export default function Navbar() {
    const pathname = usePathname();

     const links = [
    { href: "/", label: "Home" },
    { href: "/browse-events", label: "Browse Events" },
    { href: "/categories", label: "Categories" },
    { href: "/about", label: "About" },
    { href: "/contacts", label: "Contacts" },
  ];

  const navItems = () => (
    <>
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={`${
              pathname === link.href
                ? "text-[#FF0000] font-semibold  border-[#FF0000]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </>
  );


  return (
    <div className='sticky top-0 z-50 w-full '>
      <div className="navbar bg-[#000000] shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {navItems()}
      </ul>
    </div>
    <Link href={"/"} className="gap-2 flex text-xl">
      <Image className='rounded'  alt='image' src={'/assets/images (10).png'} width={32} height={32} />
     <p className='text-white text-2xl  font-bold'>Ticket<span className='text-[#FF0000] '>Hub</span></p>
    </Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {navItems()}
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn  border border-gray-600 bg-[#000000] text-gray-400 rounded-md shadow-none">Login</a>
  </div>
</div></div>
  )
}
