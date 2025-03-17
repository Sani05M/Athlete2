import React, { useState, useEffect } from 'react';
import News from './News';
import { Newspaper} from 'lucide-react';

const SportsPage = () => {
  const [headlines, setHeadlines] = useState([]);

  useEffect(() => {
    fetch('https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=968ed8d338864e7cb30985681a6b4893')
      .then(response => response.json())
      .then(data => setHeadlines(data.articles));
  }, []);

  return (
    <div>
      <div className="flex items-center mb-6">
        <Newspaper className="w-6 h-6 text-blue-600 mr-2" />
        <h2 className="text-2xl font-bold text-orange-800">Trending News</h2>
      </div>
      <News headlines={headlines} />
    </div>
  );
};

export default SportsPage;