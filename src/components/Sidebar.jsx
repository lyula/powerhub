import React from 'react';

import { HomeIcon, FireIcon, AcademicCapIcon, VideoCameraIcon, UserIcon, BookmarkIcon, HeartIcon, PlayCircleIcon, ClockIcon } from './icons';

const items = [
  { label: 'Home', icon: <HomeIcon /> },
  { label: 'Trending', icon: <FireIcon /> },
  { label: 'Specializations', icon: <AcademicCapIcon /> },
  { label: 'My Videos', icon: <VideoCameraIcon /> },
  { label: 'Saved Videos', icon: <BookmarkIcon /> },
  { label: 'Liked Videos', icon: <HeartIcon /> },
  { label: 'Course Videos', icon: <PlayCircleIcon /> },
  { label: 'Watch History', icon: <ClockIcon /> },
  { label: 'Profile', icon: <UserIcon /> },
];

export default function Sidebar({ collapsed }) {
  return (
    <aside className={`hidden md:flex flex-col min-h-screen bg-gray-100 dark:bg-[#111111] border-r border-gray-200 dark:border-gray-900 py-6 ${collapsed ? 'w-20 px-2' : 'w-64 px-4'}`}>
  <div className={`mb-8 font-bold text-[#0bb6bc] dark:text-[#0bb6bc] ${collapsed ? 'text-lg text-center' : 'text-2xl'}`}>{collapsed ? 'P' : 'PowerHub'}</div>
      <nav className="flex flex-col gap-4">
        {items.map((item) => (
          <button key={item.label} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-900 transition ${collapsed ? 'justify-center' : ''}`}>
            <span className="w-6 h-6">{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>
    </aside>
  );
}
