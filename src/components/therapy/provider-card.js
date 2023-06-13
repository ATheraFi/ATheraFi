import React from 'react'

function ProviderCard({ author }) {
  console.log("Author ", author)
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-80">
      <div className="bg-gray-800 h-32 flex items-center justify-center">
        <img src={author.image} alt="User avatar" className="rounded-full w-20 h-20 object-cover" />
      </div>
      <div className="px-6 py-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{ author.name }</h2>
        <p className="text-gray-700 text-base">{ author.email }</p>
        <p className="text-gray-700 text-base">Los Angeles, CA</p>
        <div className="mt-4 flex">
          <div className="mr-4">
            <p className="text-gray-600 text-sm uppercase tracking-wide mb-1">Followers</p>
            <p className="text-gray-800 font-semibold text-lg">1500</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm uppercase tracking-wide mb-1">Following</p>
            <p className="text-gray-800 font-semibold text-lg">500</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 px-6 py-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2">Skills</h3>
        <ul className="list-disc pl-6">
          <li className="text-gray-700">React</li>
          <li className="text-gray-700">Node.js</li>
          <li className="text-gray-700">JavaScript</li>
        </ul>
      </div>
    </div>
  )
}

export default ProviderCard