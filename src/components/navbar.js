import Image from "next/image";
import Link from 'next/link'
import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react';
import toast from 'react-hot-toast'

function Navbar() {
  const { data: session } = useSession()

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
          
          { session ? (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src={session.user.image} />
                  </div>
                </label>
                <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                  <li><Link href="/profile">Profile</Link></li>
                  <li><button onClick={() => {
                    toast.success("Logged out")
                    signOut() }}
                  >
                    Sign Out</button>
                  </li>
                </ul>
              </div>
            ) : (
              <button onClick={() => signIn("auth0")}>Sign In/Sign Up</button>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar
