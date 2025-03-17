import React from 'react';
import { ChevronLeft, ChevronRight, Medal, Calendar, Briefcase } from 'lucide-react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import AppointmentPage from './Medical';


import SportsPage from './SportsPage';

const schemes = [
  {
    title: "Khelo India Youth Games",
    description: "Supporting young athletes with annual scholarships of ₹5 lakhs",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=2070"
  },
  {
    title: "Target Olympic Podium Scheme (TOPS)",
    description: "Elite athlete support program for Olympic preparation",
    image: "https://www.manoramayearbook.in/content/dam/yearbook/learn/world/images/2020/mar/Olympics-2021.jpg"
  },
  {
    title: "National Sports Development Fund",
    description: "Financial assistance for sports infrastructure and training",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=2070"
  }
];

const upcomingMatches = [
  {
    event: "ICC T20 World Cup 2024",
    location: "West Indies & USA",
    date: "June 1-29, 2024",
    teams: "India vs Australia"
  },
  {
    event: "Asian Games 2024",
    location: "Aichi-Nagoya, Japan",
    date: "September 2024",
    teams: "Multiple Sports"
  },
  {
    event: "Paris Olympics 2024",
    location: "Paris, France",
    date: "July 26 - August 11, 2024",
    teams: "Global Event"
  }
];

const jobOpportunities = [
  {
    company: "Sports Authority of India",
    position: "Sports Officer",
    type: "Government",
    location: "Multiple Locations"
  },
  {
    company: "Indian Railways",
    position: "Sports Quota",
    type: "Government",
    location: "Pan India"
  },
  {
    company: "Reliance Industries",
    position: "Sports Manager",
    type: "Private",
    location: "Mumbai"
  },
  {
    company: "JSW Sports",
    position: "Athletic Trainer",
    type: "Private",
    location: "Bangalore"
  }
];

function HeroPage() {
  const [currentScheme, setCurrentScheme] = React.useState(0);

  const nextScheme = () => {
    setCurrentScheme((prev) => (prev + 1) % schemes.length);
  };

  const prevScheme = () => {
    setCurrentScheme((prev) => (prev - 1 + schemes.length) % schemes.length);
  };
  

  return (
    <div className="min-h-screen bg-gray-50  dark:bg-gray-900">
      {/* Hero Section with Schemes Slider */}
      <div className="relative h-[600px] overflow-hidden ">
        <div 
          className="absolute inset-0 transition-transform duration-500 ease-in-out"
          style={{
            backgroundImage: `url(${schemes[currentScheme].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0  bg-opacity-50">
            <div className="container mx-auto px-6 h-full flex items-center">
              <div className="text-white max-w-3xl">
                <h1 className="text-5xl font-bold mb-4 ml-35">{schemes[currentScheme].title}</h1>
                <p className="text-xl mb-8 ml-35">{schemes[currentScheme].description}</p>
                <button className="bg-orange-700 hover:bg-orange-800 ml-35 text-white px-8 py-3 rounded-lg font-semibold">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
        <button 
          onClick={prevScheme}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 p-2 rounded-full hover:bg-white/50 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button 
          onClick={nextScheme}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 p-2 rounded-full hover:bg-white/50 transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
      

      {/* Upcoming Matches Section */}
      <section className="py-16 ">
        <div className="container mx-auto px-6">
          <div className="flex items-center mb-8">
            <Calendar className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-orange-800">Upcoming Matches</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {upcomingMatches.map((match, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{match.event}</h3>
                <p className="text-gray-600 mb-1">{match.location}</p>
                <p className="text-gray-600 mb-3">{match.date}</p>
                <p className="text-blue-600 font-semibold">{match.teams}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Opportunities Section */}
      <div>
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 ">
          <div className="flex items-center mb-8 ">
            <Briefcase className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-orange-800">Vacancies for Athlete's</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 ">
            {jobOpportunities.map((job, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{job.company}</h3>
                    <p className="text-gray-600 mb-1">{job.position}</p>
                    <p className="text-gray-600">{job.location}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    job.type === 'Government' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {job.type}
                  </span>
                </div>
                <button className="mt-4 text-blue-600 font-semibold hover:text-blue-700">
                  Apply Now →
                </button>
              </div>
            ))}
          </div>
          
        </div>
        <button className="bg-orange-700 mt-4 hover:bg-orange-800 ml-35 text-white px-8 py-3 rounded-lg font-semibold">
                  Learn More
                </button>
        </section>
        </div>
      
      <SportsPage />
      <footer className="bg-gray-900 text-white">
  {/* Footer Content */}
  <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
    {/* About Section */}
    <div>
      <h3 className="text-lg font-semibold mb-4">About Sports India</h3>
      <p className="text-sm text-gray-400">
        Sports India is dedicated to bringing the latest updates, events, and insights from the world of sports.
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
      <ul className="text-sm text-gray-400 space-y-2">
        <li>
          <a href="#" className="hover:text-white transition-colors">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-white transition-colors">
            Events
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-white transition-colors">
            Blog
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-white transition-colors">
            Contact Us
          </a>
        </li>
      </ul>
    </div>

    {/* Follow Us */}
    <div>
      <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
      <div className="flex space-x-4">
        <a href="#" className="text-gray-400 hover:text-white transition-colors">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="#" className="text-gray-400 hover:text-white transition-colors">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#" className="text-gray-400 hover:text-white transition-colors">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="#" className="text-gray-400 hover:text-white transition-colors">
          <i className="fab fa-linkedin-in"></i>
        </a>
      </div>
    </div>
  </div>

  {/* Footer Bottom */}
  <div className="bg-gray-900 text-center py-4">
    <p className="text-sm text-gray-400">© 2025 Sports India. All Rights Reserved.</p>
  </div>
</footer>

    </div>
  );
}

export default HeroPage;