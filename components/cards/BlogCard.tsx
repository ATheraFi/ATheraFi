import Link from "next/link";
import moment from "moment";

export default function BlogCard({ post }: any) {
  return (
    <div className="bg-white rounded-lg shadow-lg transition duration-300 hover:shadow-xl">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative overflow-hidden">
          <img
            src={post.coverImage.url}
            alt={post.title}
            className="object-cover w-full h-48 sm:h-64"
          />
          <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gradient-to-t from-black">
            <h2 className="text-lg font-semibold text-white">{post.title}</h2>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <span className="mr-2">{post.author.name}</span>
            <span className="mr-2">•</span>
            <span>{moment(post.createdAt).format('MMM DD, YYYY')}</span>
          </div>
          <p className="text-gray-700 leading-snug mb-4">{post.excerpt}</p>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">Read more</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </div>
  );
}
