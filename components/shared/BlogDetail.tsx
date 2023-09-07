import React from 'react';
import moment from 'moment/moment';
import { RichText } from "@graphcms/rich-text-react-renderer"

const BlogDetail: React.FC<{ post: any }> = async ({ post }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img src={post.coverImage.url} alt="" className="object-cover w-full h-64" />
      <div className="p-6">
        <div className="flex items-center mb-4">
          <img
            alt={post.author.name}
            src={post.author.picture.url}
            className="w-8 h-8 rounded-full mr-2"
          />
          <p className="text-gray-700 font-medium text-lg">{post.author.name}</p>
        </div>
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{moment(post.createdAt).format('MMM DD, YYYY')}</span>
        </div>
        <h1 className="text-4xl font-semibold mb-8">{post.title}</h1>
        <RichText 
          content={post?.content?.json}
          renderers={{
            h2: ({ children }) => <h2 className="text-2xl font-bold">{ children }</h2>,
            h3: ({ children }) => <h3 className="text-xl font-bold">{ children }</h3>,
            h4: ({ children }) => <h4 className="text-lg font-bold">{ children }</h4>,
            h5: ({ children }) => <h5 className="text-md font-bold">{ children }</h5>,
            bold: ({ children }) => <strong className="font-bold">{children}</strong>
          }}
        />
      </div>
    </div>
  );
};

export default BlogDetail;
