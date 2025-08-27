import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import StudentUtility from '../components/StudentUtility';
import BottomTabs from '../components/BottomTabs';
import Filters from '../components/Filters';
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
  <div className="min-h-screen bg-gray-100 dark:bg-[#111111] w-full" style={{ overflowX: 'hidden' }}>
      <HeaderFixed onToggleSidebar={handleToggleSidebar} />
  <div className="flex flex-row w-full" style={{ height: 'calc(100vh - 56px)', maxWidth: '100vw', overflowX: 'hidden' }}>
        <SidebarFixed sidebarOpen={sidebarOpen} />
        {/* Render StudentUtility only when sidebar is collapsed on desktop */}
        {!sidebarOpen && (
          <div className="md:ml-20">
            <StudentUtility />
          </div>
        )}
  <div className={`flex-1 flex flex-col ${sidebarOpen ? 'ml-0 md:ml-64' : 'ml-0 md:ml-0'} w-full`} style={{ maxWidth: '100vw', overflowX: 'hidden' }}>
          <div className="p-4 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-[#0bb6bc] dark:text-[#0bb6bc]">Welcome to PowerHub</h2>
            {/* Removed the statement as requested */}

            {/* Category Filters */}
            <Filters />
          </div>
          <main className="flex-1 p-2 sm:p-4 pb-0 overflow-y-auto w-full" style={{ maxWidth: '100vw', overflowX: 'hidden' }}>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 w-full"
              style={{ margin: 0, maxWidth: '100vw', overflowX: 'hidden' }}
            >
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-gray-100 dark:bg-[#111111] rounded-lg shadow-md overflow-hidden animate-pulse flex flex-col min-w-0 w-full"
                    style={{ maxWidth: '100%', minWidth: 0 }}
                  >
                    <div className="w-full aspect-video bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-base">Loading...</span>
                    </div>
                    <div className="p-2 sm:p-3 flex-1 flex flex-col justify-between">
                      <h3 className="font-semibold text-xs sm:text-base md:text-lg text-[#c42152] dark:text-[#c42152] truncate">Video Title {i+1}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Specialization • Student Name</p>
                    </div>
                  </div>
                ))
              ) : (
                videos.map((video, i) => (
                  <div
                    key={i}
                    className="bg-gray-100 dark:bg-[#111111] rounded-lg shadow-md overflow-hidden flex flex-col min-w-0 w-full"
                    style={{ maxWidth: '100%', minWidth: 0 }}
                  >
                    <div className="w-full aspect-video bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                      <img src={video.thumbnail} alt={video.title} className="object-cover w-full h-full" style={{ borderRadius: '0.5rem 0.5rem 0 0' }} />
                    </div>
                    <div className="p-2 sm:p-3 flex-1 flex flex-col justify-between">
                      <div className="flex items-start gap-2 sm:gap-3 mb-1">
                        <img src={video.profile} alt={video.author} className="w-7 h-7 sm:w-10 sm:h-10 rounded-full border-2 border-gray-300 dark:border-gray-700 flex-shrink-0" />
                        <div className="flex flex-col min-w-0">
                          <h3 className="font-bold text-xs sm:text-base md:text-lg text-white truncate" title={video.title}>{video.title}</h3>
                          <span className="text-xs font-medium text-gray-600 dark:text-gray-400 mt-1 truncate">{video.author}</span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mb-1 pl-7 sm:pl-14 truncate">
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
  // If sidebarOpen is false, collapse to icons-only (width 20, hide labels)
  return (
    <div className={`fixed top-14 left-0 h-[calc(100vh-56px)] ${sidebarOpen ? 'w-64' : 'w-20'} z-30 bg-transparent md:block`}>
      <Sidebar collapsed={!sidebarOpen} />
    </div>
  );
}
