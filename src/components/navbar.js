import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from 'next/link'
import React from 'react'
import toast from 'react-hot-toast'

function Navbar() {
  const { user } = useUser();

  return (
    <div>
      <div className="navbar bg-transparent px-10 text-black">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
            </ul>
          </div>
          <Link href="/">
            <Image width={150} height={100} src='/transparent-logo.svg' alt="ATheraFi" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          { !user ? (
            <div>
              <Link href="/sign-up" className="btn btn-sm btn-secondary mr-2">Sign Up</Link>
              <Link href="/sign-in" className="btn btn-sm btn-primary btn-outline">Sign In</Link>
            </div>
          ) : (
            <UserButton
              userProfileMode="navigation"
              userProfileUrl={
                typeof window !== "undefined" ? `${window.location.origin}/profile` : undefined
              }
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
