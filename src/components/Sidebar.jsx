import React from 'react';

import { HomeIcon, FireIcon, AcademicCapIcon, VideoCameraIcon, UserIcon } from './icons';

const items = [
  { label: 'Home', icon: <HomeIcon /> },
  { label: 'Trending', icon: <FireIcon /> },
  { label: 'Specializations', icon: <AcademicCapIcon /> },
  { label: 'My Videos', icon: <VideoCameraIcon /> },
  { label: 'Profile', icon: <UserIcon /> },
];

export default function Sidebar() {
  return (
  <aside className="hidden md:flex flex-col w-64 min-h-screen bg-gray-100 dark:bg-[#111111] border-r border-gray-200 dark:border-gray-900 py-6 px-4">
      <div className="mb-8 text-2xl font-bold text-[#0bb6bc] dark:text-[#0bb6bc]">PowerHub</div>
      <nav className="flex flex-col gap-4">
        {items.map((item) => (
          <button key={item.label} className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-900 transition">
            <span className="w-6 h-6">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
