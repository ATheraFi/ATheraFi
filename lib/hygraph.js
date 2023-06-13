import { request, gql } from 'graphql-request';
const graphAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
  const query = gql`
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
  const result = await request(graphAPI, query);
  return result.postsConnection.edges;
}

export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug : String!) {
      post(where: {slug: $slug}) {
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
          raw
        }
      }
    }
  `

  const result = await request(graphAPI, query, { slug });

  return result.post
}

export const getFeaturedPosts = async () => {
  const query = gql`
    query getFeaturedPosts {
      posts(
        where: {featured: true}, 
        orderBy: createdAt_ASC
        last: 3
      ) {
        id
        title
        excerpt
        coverImage {
          url
        }
        author {
          name
          picture {
            url
          }
        }
        createdAt
        slug
      }
    }
  `

  const result = await request(graphAPI, query);

  return result.posts
}