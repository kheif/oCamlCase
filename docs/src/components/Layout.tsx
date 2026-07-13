import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Topbar from './Topbar';
import Sidebar from './Sidebar';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    // Close the mobile sidebar on every navigation; doing it here also covers
    // full reloads back into the SPA, which a Sidebar/Topbar onClick handler
    // alone wouldn't catch. Scroll reset lives in <ScrollToTop /> so it also
    // applies to full-screen routes outside this layout.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <>
      <div
        className={`overlay${sidebarOpen ? ' open' : ''}`}
        id="overlay"
        onClick={() => setSidebarOpen(false)}
      />
      <Topbar onMenuClick={() => setSidebarOpen((v) => !v)} />
      <div className="layout">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="main">
          <Outlet />
        </div>
      </div>
    </>
  );
}
