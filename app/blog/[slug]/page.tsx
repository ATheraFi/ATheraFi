"use client"

import React from 'react'
import { useRouter } from 'next/router'
import AuthorCard from '@/components/cards/AuthorCard';
import BlogCard from '@/components/cards/BlogCard';
import BlogDetail from '@/components/shared/BlogDetail';
import LoadingPage from '@/components/shared/LoadingPage';


const getBlogPostDetails = async (slug: string) => {
  const response = await fetch(process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT as string, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query GetPostDetails($slug : String!) {
          post(where: {slug: $slug}) {
            id
            title
            excerpt
            coverImage {
              url
            }
            author {
              name
              biography
              picture {
                url
              }
            }
            createdAt
            slug
            content {
              json
            }
          }
        }
      `,
      variables: { slug: slug, }
    })
  })

  const { data } = await response.json();

  return data.post
}



export default async function PostDetails({ params }: any) {
  const post = await getBlogPostDetails(params.slug)

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