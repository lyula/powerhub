import React, { useState } from 'react';

export default function Header({ onToggleSidebar }) {
  return (
    <header className="w-full bg-gray-100 dark:bg-[#111111] border-b border-gray-200 dark:border-gray-900 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3 w-full">
        <button
          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-900 focus:outline-none"
          aria-label="Toggle sidebar"
          onClick={onToggleSidebar}
        >
          <svg width="24" height="24" fill="none" stroke="#0bb6bc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <span className="hidden md:inline text-xl font-bold text-[#0bb6bc] dark:text-[#0bb6bc]">PLP PowerHub</span>
      </div>
      <div className="flex items-center gap-4 w-full justify-center">
        <input type="text" placeholder="Search videos..." className="px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0bb6bc] placeholder-gray-400 w-full max-w-xs text-center" />
        <button className="hidden md:inline px-4 py-2 rounded-lg bg-[#c42152] text-white font-semibold hover:bg-[#0bb6bc] transition">Upload</button>
      </div>
    </header>
  );
}
