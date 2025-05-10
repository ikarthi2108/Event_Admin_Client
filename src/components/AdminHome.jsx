import React from 'react';
import { CalendarDays, MapPin, Camera, BarChart } from 'lucide-react';

const AdminHome = () => {
  const quickActions = [
    { 
      title: "Add New Venue", 
      description: "Register a new location for events",
      icon: <MapPin className="w-6 h-6" />, 
      bg: "bg-blue-600", 
      hoverBg: "hover:bg-blue-700",
      link: "/admin/venues/" 
    },
    { 
      title: "Add Photographer", 
      description: "Onboard a new photography professional",
      icon: <Camera className="w-6 h-6" />, 
      bg: "bg-purple-600", 
      hoverBg: "hover:bg-purple-700",
      link: "/admin/photographers/add" 
    },
    { 
      title: "Add Makeup Artists", 
      description: "Add Makeup Artists for your artists",
      icon: <CalendarDays className="w-6 h-6" />, 
      bg: "bg-emerald-600", 
      hoverBg: "hover:bg-emerald-700",
      link: "/admin/events/create" 
    },
    { 
      title: "Add Catering Service", 
      description: "Add Catering Service for events",
      icon: <BarChart className="w-6 h-6" />, 
      bg: "bg-indigo-600", 
      hoverBg: "hover:bg-indigo-700",
      link: "/admin/analytics" 
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
        <p className="text-gray-600">Fast access to common management tasks</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action, index) => (
          <a
            key={index}
            href={action.link}
            className={`group relative overflow-hidden ${action.bg} ${action.hoverBg} rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 -mr-12 -mt-12 rounded-full opacity-20 bg-white"></div>
            <div className="p-6">
              <div className="bg-white/20 rounded-full p-3 inline-flex mb-4">
                {action.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{action.title}</h3>
              <p className="text-white/80 text-sm">{action.description}</p>
              <div className="mt-4 flex items-center text-white text-sm font-medium">
                <span>Get started</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform duration-300 transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default AdminHome;