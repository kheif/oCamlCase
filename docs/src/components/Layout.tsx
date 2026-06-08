import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Topbar from './Topbar';
import Sidebar from './Sidebar';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    // Reset transient route-driven UI (mobile sidebar, scroll position) on
    // every navigation; closing here also covers full reloads back into the
    // SPA, which a Sidebar/Topbar onClick handler alone wouldn't catch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSidebarOpen(false);
    window.scrollTo(0, 0);
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
