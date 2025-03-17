import React from 'react';

const NewsContainer = ({ headlines = [] }) => (
  <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
    {headlines.length > 0 ? (
      headlines.slice(0, 6).map((article, i) => (
        <NewsArticle key={i} {...article} />
      ))
    ) : (
      <p className="text-gray-500 text-center col-span-3">No news available.</p>
    )}
  </div>
);

const NewsArticle = ({ title, author, url, description, urlToImage }) => (
  <a 
    href={url} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-105"
  >
    {urlToImage ? (
      <img src={urlToImage} alt={title || "News Image"} className="w-full h-48 object-cover" />
    ) : (
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
        No Image
      </div>
    )}
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2 text-gray-900">{title || "Untitled News"}</h3>
      <p className="text-sm text-gray-500">{author || "Unknown Author"}</p>
      <p className="text-gray-700 line-clamp-3">{description || "No description available."}</p>
    </div>
  </a>
);

export default NewsContainer;
