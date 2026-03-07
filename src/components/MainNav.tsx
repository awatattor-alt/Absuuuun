import React from 'react';
import { NavLink } from 'react-router-dom';
import { Bell, Home, MessageCircle, Rss, User } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Home', Icon: Home },
  { to: '/feed', label: 'Feed', Icon: Rss },
  { to: '/messages', label: 'Messages', Icon: MessageCircle },
  { to: '/notifications', label: 'Notifications', Icon: Bell },
  { to: '/profile', label: 'Profile', Icon: User },
];

const baseLink = 'px-3 py-2 rounded-lg text-sm transition focus:outline-none focus:ring-2 focus:ring-sky-400';

const MainNav: React.FC = () => {
  return (
    <>
      <nav className="hidden md:flex sticky top-0 z-40 bg-slate-900/90 backdrop-blur border-b border-slate-700 p-3 gap-2 justify-center">
        {navItems.map(({ to, label }) => (
          <NavLink key={to} to={to} className={({ isActive }) => `${baseLink} ${isActive ? 'bg-sky-500 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
            {label}
          </NavLink>
        ))}
      </nav>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900 border-t border-slate-700 px-2 py-1">
        <ul className="grid grid-cols-5">
          {navItems.map(({ to, label, Icon }) => (
            <li key={to}>
              <NavLink to={to} className={({ isActive }) => `flex flex-col items-center py-2 rounded-md text-xs ${isActive ? 'text-sky-400' : 'text-slate-300 hover:text-white'}`}>
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default MainNav;
