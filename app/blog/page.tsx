import BlogCard from "@/components/cards/BlogCard";

const getBlogPosts = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT as string, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query Posts {
          postsConnection {
            edges {
              node {
                id
                title
                slug
                excerpt
                author {
                  name
                }
                createdAt
                coverImage {
                  url
                }
              }
              cursor
            }
          }
        }
      `
    })
  })

  const { data } = await response.json();
  return data.postsConnection.edges
}


export default async function Blog() {
  const posts = await getBlogPosts();

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Latest Blog Posts</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          { posts.map((post: any) => (
            <BlogCard key={post.node.id} post={post.node} />
          )) }
        </div>
      </div>
    </div>
  );
}
