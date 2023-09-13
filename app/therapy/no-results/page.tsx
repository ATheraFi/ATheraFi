import React from 'react'
import SearchBar from '@/components/shared/SearchBar'

export default function Page() {
  return (
    <>
    <div className="my-4 w-full px-8">
      <SearchBar />
    </div>
    <div className="flex flex-col justify-center items-center h-[75vh] mx-8">
      <h1 className="font-bold text-3xl">No Results Found</h1>
      <p>Thank you! Because of your search, our servers have been notified of no results.</p>
      <p>This then sends a prompt to us to do some research and contact services in your area to get them added to our database.</p>
    </div>
    </>
  )
}