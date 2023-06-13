import React from 'react'
import Navbar from './navbar'
import Footer from './footer'

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        { children }
      </div>
      <Footer />
    </div>
  )
}

export default Layout