import React, { useState } from 'react';
import { 
  Home, 
  User, 
  BarChart2, 
  Shield, 
  DollarSign, 
  Menu 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SideNavbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const navItems = [
    { icon: Home, label: 'Dashboard', href: '/' },
    { icon: BarChart2, label: 'Performance', href: '/running' },
    { icon: Shield, label: 'Injuries', href: '/Medical' },
    { icon: DollarSign, label: 'Financial', href: '/financial' },
    
  ];

  return (
    <div 
      className={`h-screen bg-gray-900 text-white transition-all duration-300 
        ${isExpanded ? 'w-64' : 'w-20'} fixed left-0 top-0 z-50`}
    >
      <div className="flex flex-col h-full">
        {/* Logo & Toggle */}
        <div className="flex items-center justify-between p-4  border-orange-700">
          {isExpanded && (
            <div className="text-xl font-bold">Khiladi</div>
          )}
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="hover:bg-orange-700 p-2 rounded"
          >
            <Menu />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-grow mt-4">
          <ul className="space-y-2">
            {navItems.map((item, index) => (
              <li key={index}>
                

<Link to={item.href} className={`flex items-center p-3 hover:bg-orange-700 
  ${isExpanded ? 'justify-start px-6' : 'justify-center'}`}
>
  <item.icon className="mr-4" />
  {isExpanded && <span>{item.label}</span>}
</Link>

              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SideNavbar;