import React from 'react';
import { Search, Home, Users, Briefcase, MessageCircle, TrendingUp, Bookmark, Bell, ChevronDown } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { name: 'Home', icon: Home, path: '/' },
        { name: 'My Network', icon: Users, path: '/mynetwork' }, // Assuming these paths exist or will exist
        { name: 'Jobs', icon: Briefcase, path: '/jobs' },
        { name: 'Messaging', icon: MessageCircle, path: '/messaging' },
        { name: 'Growth AI', icon: TrendingUp, path: '/growth-ai' },
        { name: 'Saved', icon: Bookmark, path: '/saved' }
    ];

    return (
        <header className="bg-white shadow-sm border-b fixed top-0 left-0 right-0 z-50">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex items-center justify-between h-14">
                    {/* Left side - Logo and Search */}
                    <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                            <span className="text-white font-bold text-sm">in</span>
                        </div>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search"
                                className="pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-md text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex items-center space-x-8">
                        {navItems.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => navigate(item.path)}
                                className={`flex flex-col items-center space-y-1 px-3 py-2 text-xs transition-colors ${location.pathname === item.path
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                <span>{item.name}</span>
                            </button>
                        ))}
                    </nav>

                    {/* Right side */}
                    <div className="flex items-center space-x-4">
                        <Bell className="w-5 h-5 text-gray-600 hover:text-gray-900 cursor-pointer" />
                        <div className="w-8 h-8 bg-gray-300 rounded-full cursor-pointer hover:bg-gray-400 transition-colors"></div>
                        <ChevronDown className="w-4 h-4 text-gray-600 hover:text-gray-900 cursor-pointer" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;