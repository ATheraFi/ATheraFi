import React from 'react'
import Image from 'next/image'
import { graphCMSImageLoader } from '../../utils/graphCMSImageLoader'

const AuthorCard = ({ author }: any) => {
  return (
    <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-blue-100 shadow-xl">
      <div className="absolute left-0 right-0 -top-14">
        <Image
          unoptimized
          loader={graphCMSImageLoader}
          alt={author.name}
          height={100}
          width={100}
          className="align-middle rounded-full"
          src={author.picture.url}
        />
      </div>
      <h3 className="text-black mt-4 mb-4 text-xl font-bold">{author.name}</h3>
      <p className="text-black text-ls">{author.biography}</p>
    </div>
  )
}

export default AuthorCard