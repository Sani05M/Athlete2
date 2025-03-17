import React from 'react';

const NewsContainer = ({ headlines }) => (
  <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {headlines.slice(0, 6).map(({ title, author, url, description, urlToImage }, i) => (
      <NewsArticle key={i} title={title} author={author} url={url} description={description} urlToImage={urlToImage} />
    ))}
  </div>
);

const NewsArticle = ({ title, author, url, description, urlToImage }) => (
  <div className="bg-white shadow-lg rounded-lg p-4">
    <a href={url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
      {urlToImage && (
        <img src={urlToImage} alt={title} className="mb-4 w-full rounded-t-lg" />
      )}
      <h3 className="text-lg font-medium mb-2">{title}</h3>
    </a>
    <p className="text-gray-500 mb-2">{author}</p>
    <p className="text-gray-700 line-clamp-3">{description}</p>
  </div>
);

export default NewsContainer;