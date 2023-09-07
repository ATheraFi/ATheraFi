import React from 'react';
import moment from 'moment/moment';

interface RawContent {
  children: Array<{
    text: string;
  }>;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  type: string;
}

const BlogDetail = ({ post }: any) => {
  const getContentFragment = (index: number, text: string | JSX.Element[], obj: RawContent, type: string): JSX.Element | string => {
    let modifiedText: string | JSX.Element[] = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>;
      }

      if (obj.italic) {
        modifiedText = <em key={index}>{text}</em>;
      }

      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>;
      }
    }

    switch (type) {
      case 'heading-three':
        return <h3 key={index} className="text-2xl font-semibold mb-4">{modifiedText}</h3>;
      case 'paragraph':
        return <p key={index} className="mb-6">{modifiedText}</p>;
      case 'heading-four':
        return <h4 key={index} className="text-xl font-semibold mb-4">{modifiedText}</h4>;
      case 'heading-five':
        return <h5 key={index} className="text-lg font-semibold mb-4">{modifiedText}</h5>;
      case 'image':
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
            className="object-cover object-center w-full mb-6 rounded-lg shadow-md"
          />
        );
      default:
        return modifiedText;
    }
  };

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
        {post.content.raw.children.map((typeObj, index) => {
          const children = typeObj.children.map((item, itemIndex) =>
            getContentFragment(itemIndex, item.text, item)
          );

          return getContentFragment(index, children, typeObj, typeObj.type);
        })}
      </div>
    </div>
  );
};

export default BlogDetail;
