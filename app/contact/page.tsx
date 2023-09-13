import React from 'react';

export default function Page() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h1>
      <p className="text-gray-600 mb-8">Have questions or need assistance? Reach out to us using the form below, and we'll get back to you as soon as possible.</p>
      <div className="grid grid-cols-1 gap-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Send us a message</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-800 font-medium mb-2">Name</label>
              <input type="text" id="name" className="border border-gray-300 rounded-md py-2 px-3 w-full" placeholder="Your name" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-800 font-medium mb-2">Email</label>
              <input type="email" id="email" className="border border-gray-300 rounded-md py-2 px-3 w-full" placeholder="Your email" />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-800 font-medium mb-2">Message</label>
              <textarea id="message" className="border border-gray-300 rounded-md py-2 px-3 w-full h-32" placeholder="Your message"></textarea>
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-300">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  )
}