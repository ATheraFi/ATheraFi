import { SearchBar } from "@/components";
import {BlogCard} from "@/components";
import { useUser } from "@clerk/nextjs";
import { getFeaturedPosts } from "../../lib/hygraph";

export default function Home({ posts }) {
  const { user } = useUser()
  console.log('User => ', user)
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[75vh] bg-gradient-to-l from-blue-400 to-blue-800">
        <div className="max-w-5xl w-full p-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white text-center mb-8">
            Welcome to <span className="text-yellow-400">ATheraFi</span>
          </h1>
          <p className="text-lg md:text-2xl text-white text-center mb-8">
            We are here to help you find the right therapy and resources for your unique needs.
          </p>
          <div className="flex items-center justify-center mb-8">
            <SearchBar />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h2 className="text-xl md:text-2xl font-bold text-blue-700 mb-4">Find Therapists</h2>
              <p className="text-gray-600 mb-8">
                Just enter your location in the seach bar, select the service you are looking for, and search! 
              </p>
            </div>

            {/* This will link to a blog post explaining what we offer, which will also link to a blog post of our "roadmap" */}
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h2 className="text-xl md:text-2xl font-bold text-blue-700 mb-4">Therapy Types</h2>
              <p className="text-gray-600 mb-8">ATheraFi currently hosts a database of Behavioral, Occupational, and Physical therapists all over the United States</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h2 className="text-xl md:text-2xl font-bold text-blue-700 mb-4">FAQs</h2>
              <p className="text-gray-600 mb-8">Have questions? Check out our FAQ page for answers, or to ask your question</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center bg-gradient-to-b from-gray-100 to-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Latest from our blog
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const posts = (await getFeaturedPosts() || []);
  return {
    props: { posts }
  }
}