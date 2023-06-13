import { BlogCard } from "@/components";
import { getPosts } from "../../../lib/hygraph";

export default function Blog({ posts }) {
  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Latest Blog Posts</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.node.id} post={post.node} />
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const posts = await getPosts() || [];
  return {
    props: { posts }
  };
}

