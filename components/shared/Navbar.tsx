"use client"

import { UserButton, useClerk, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from 'next/link'
import React from 'react'
import toast from 'react-hot-toast'

function Navbar() {
  const { user } = useUser();
  const { signOut } = useClerk();
  console.log("User: ", user);

  return (
    <div className="navbar bg-base-100">
      <div className="lg:hidden">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <Link href="/" className="hover:text-gray-300">Home</Link>
            <Link href="/blog" className="hover:text-gray-300">Blog</Link>
            <Link href="/about" className="hover:text-gray-300">About</Link>
          </ul>
        </div>
      </div>

      {/* Company Logo */}
      <div className="flex-1">
        <Image
          src="/transparent-logo.svg"
          alt="ATheraFi"
          width={120}
          height={80}
        />
      </div>

      {/* Desktop Navigation */}
      <div className="lg:flex flex-2 space-x-6 hidden">
        <Link href="/" className="hover:text-gray-300">Home</Link>
        <Link href="/blog" className="hover:text-gray-300">Blog</Link>
        <Link href="/about" className="hover:text-gray-300">About</Link>
      </div>

      {/* Auth Buttons */}
      <div className="flex-1 space-x-2 justify-end">
        { user ? (
          <UserButton
            userProfileMode="navigation"
            userProfileUrl={
              typeof window !== "undefined" ? `${window.location.origin}/profile` : undefined
            }
          />
        ) : (
          <div className="space-x-6">
            <Link href="/sign-in" className="font-bold">Login</Link>
            <Link href="/sign-up" className="btn btn-primary btn-outline">Register</Link>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default Navbar
