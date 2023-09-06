import SearchBar from "@/components/shared/SearchBar";

export default function Home() {
  return (
    <>
      <div className="flex flex-col md:flex-row h-[50vh] items-center bg-[url('/background-new.png')] bg-no-repeat bg-cover">
        <div className="md:w-2/3 text-black py-16 px-10">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 drop-shadow-lg">
            Welcome to <span className="text-yellow-400">ATheraFi</span>
          </h1>
          <p className="text-lg md:text-2xl text-white mb-8 drop-shadow-lg">
            We are here to help you find the right therapy and resources for your unique needs.
          </p>
          <SearchBar />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 m-8">
        <div className="bg-gray-100 rounded-lg shadow-md p-8 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-blue-700 mb-4">Find Therapists</h2>
          <p className="text-gray-600 mb-8">
            Just enter your location in the seach bar, select the service you are looking for, and search! 
          </p>
        </div>

        <div className="bg-gray-100 rounded-lg shadow-md p-8 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-blue-700 mb-4">Therapy Types</h2>
          <p className="text-gray-600 mb-8">ATheraFi currently hosts a database of Behavioral, Occupational, and Physical therapists all over the United States</p>
        </div>

        <div className="bg-gray-100 rounded-lg shadow-md p-8 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-blue-700 mb-4">FAQs</h2>
          <p className="text-gray-600 mb-8">Have questions? Check out our FAQ page for answers, or to ask your question</p>
        </div>
      </div>

      <div className="flex flex-col justify-center bg-gradient-to-b from-gray-100 to-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Latest from our blog
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          </div>
        </div>
      </div>
    </>
  )
}