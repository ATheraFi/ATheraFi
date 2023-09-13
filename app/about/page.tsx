import React from 'react'
import Image from 'next/image'
import header from '../../public/bg-bp.jpg'
import jake from '../../public/jake.jpg'

function Page() {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 mt-5 mx-auto flex flex-col">
        <div className="lg:w-4/6 mx-auto">
          <div className="rounded-lg h-64 overflow-hidden hidden lg:block">
            <Image 
              src={header}
              alt="Header"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col sm:flex-row mt-10">
            <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
            <div className="avatar">
              <div className="w-24 rounded-full">
                <Image 
                  src={jake}
                  alt="Jake"
                />
              </div>
            </div>
              <div className="flex flex-col items-center text-center justify-center">
                <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">Jake Reck</h2>
                <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                <p className="text-base">Owner - CEO</p>
              </div>
            </div>
            <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
              <p className="leading-relaxed text-lg mb-4">
                When Jake was a behavioral therapist working closely with families, he quickly realized a lot of parents did not know
                what resources were available to them. He knew the value and effect therapies can have on the development of a childs life.
              </p>
              <p className="leading-relaxed text-lg mb-4">
                Jake has created ATherFi with the hopes of helping bridge that gap. His mission is simple - <em>Help parents, caregivers, and guardians
                find therapies and other resources that are available to them in their area.</em>
              </p>
              <p className="leading-relaxed text-lg mb-4">
                ATheraFi is a web application designed to help parents, guardians, and caregivers find the resources they need to 
                support their loved ones with special needs. Our platform provides a growing database of resources. With ATheraFi, 
                users can quickly and easily find the support they need to help their loved ones thrive.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Page