import { SearchBar, TherapyCard } from '@/components'
import React from 'react'
import prisma from '../../../lib/prisma'

function Therapy({ therapies }) {
  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 md:grid-cols-12 px-8 gap-4">
        <div className="col-span-1 md:col-span-8">
          <SearchBar />
        </div>
        { therapies.map((therapy) => (
          <div key={therapy.id} className="col-span-1 md:col-span-8 shadow-xl">
            <TherapyCard therapy={therapy} />
          </div>
        ))}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  let therapies = await prisma.therapy.findMany({
    include: {
      author: true,
      providers: true
    },
    orderBy: {
      createdAt: 'asc'
    }
  })
  therapies = JSON.parse(JSON.stringify(therapies))

  return {
    props: { therapies }
  }
}

export default Therapy

