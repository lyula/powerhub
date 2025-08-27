import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import BottomTabs from '../components/BottomTabs';
import { fetchThumbnails } from '../utils/fetchThumbnails';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleToggleSidebar = () => setSidebarOpen((open) => !open);

  useEffect(() => {
    async function loadVideos() {
      try {
        const thumbs = await fetchThumbnails(6);
        // Dummy data for each video card
        const authors = [
          { name: 'Alex Kim', profile: 'https://randomuser.me/api/portraits/men/32.jpg' },
          { name: 'Priya Singh', profile: 'https://randomuser.me/api/portraits/women/44.jpg' },
          { name: 'John Doe', profile: 'https://randomuser.me/api/portraits/men/65.jpg' },
          { name: 'Maria Lopez', profile: 'https://randomuser.me/api/portraits/women/68.jpg' },
          { name: 'Chen Wei', profile: 'https://randomuser.me/api/portraits/men/21.jpg' },
          { name: 'Fatima Zahra', profile: 'https://randomuser.me/api/portraits/women/12.jpg' },
        ];
        const videos = thumbs.map((thumb, i) => ({
          thumbnail: thumb,
          title: `Sample Video ${i + 1}`,
          views: Math.floor(Math.random() * 10000) + 100,
          posted: `${Math.floor(Math.random() * 12) + 1} days ago`,
          author: authors[i % authors.length].name,
          profile: authors[i % authors.length].profile,
        }));
        setVideos(videos);
      } catch (err) {
        setVideos([]);
      } finally {
        setLoading(false);
      }
    }
    loadVideos();
  }, []);

  return (
  <div className="min-h-screen bg-gray-100 dark:bg-[#111111]">
      <HeaderFixed onToggleSidebar={handleToggleSidebar} />
      <div className="flex" style={{ height: 'calc(100vh - 56px)' }}>
        <SidebarFixed sidebarOpen={sidebarOpen} />
        <div className="flex-1 flex flex-col ml-0 md:ml-64">
          <div className="p-4 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-[#0bb6bc] dark:text-[#0bb6bc]">Welcome to PowerHub</h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300">Learn, share, and grow with your fellow PLP students. Explore videos by specialization, trending topics, and more!</p>
          </div>
          <main className="flex-1 p-4 md:p-8 pb-0 overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 scrollbar-hide">
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-gray-100 dark:bg-[#111111] rounded-lg shadow-md overflow-hidden animate-pulse">
                    <div className="h-40 bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-gray-500 dark:text-gray-400">Loading...</span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-[#c42152] dark:text-[#c42152]">Video Title {i+1}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Specialization • Student Name</p>
                    </div>
                  </div>
                ))
              ) : (
                videos.map((video, i) => (
                  <div key={i} className="bg-gray-100 dark:bg-[#111111] rounded-lg shadow-md overflow-hidden">
                    <div className="h-40 bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                      <img src={video.thumbnail} alt={video.title} className="object-cover w-full h-full" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-start gap-3 mb-1">
                        <img src={video.profile} alt={video.author} className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-700 flex-shrink-0" />
                        <div className="flex flex-col">
                          <h3 className="font-bold text-xl text-[#c42152] dark:text-[#c42152] truncate max-w-[220px]" title={video.title}>{video.title}</h3>
                          <span className="text-xs font-medium text-gray-800 dark:text-gray-200 mt-1">{video.author}</span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mb-1 pl-14">
                        {video.views.toLocaleString()} views • {video.posted}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </main>
        </div>
      </div>
      <BottomTabs />
    </div>
  );
}

function HeaderFixed({ onToggleSidebar }) {
  return (
    <div className="fixed top-0 left-0 w-full z-40">
      <Header onToggleSidebar={onToggleSidebar} />
    </div>
  );
}

function SidebarFixed({ sidebarOpen }) {
  return (
    <div className={`fixed top-14 left-0 h-[calc(100vh-56px)] w-64 z-30 bg-transparent ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
      <Sidebar />
    </div>
  );
}
