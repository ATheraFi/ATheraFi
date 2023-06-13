import React from 'react'
import { useRouter } from 'next/router'
import { AuthorCard, BlogDetail, LoadingPage } from '@/components';
import { getPosts, getPostDetails } from '../../../lib/hygraph';

const PostDetails = ({ post }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <LoadingPage />
  }

  return (
    <div className="container mx-auto px-10 mb-8 mt-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <BlogDetail post={post} />
          <AuthorCard author={post.author} />
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const data = await getPostDetails(params.slug);
  return {
    props: {
      post: data
    }
  }
}

export async function getStaticPaths() {
  const posts = await (await getPosts() || []);
  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  };
}

export default PostDetails