import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { topbarLinks } from '../content/nav';
import { isTopbarActive } from '../lib/route-utils';
import { useTheme } from '../hooks/useTheme';

// Playground is a separate, script-tag-driven app; linking to or from it always
// triggers a full page load so its module-scope globals never collide.
function TopbarLink({
  to,
  active,
  fromPlayground,
  className,
  children,
}: {
  to: string;
  active?: boolean;
  fromPlayground: boolean;
  className?: string;
  children: ReactNode;
}) {
  const needsReload = to.startsWith('/playground') || fromPlayground;
  const cls = [className, active ? 'active' : ''].filter(Boolean).join(' ');
  if (needsReload) {
    return (
      <a href={to} className={cls || undefined}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to} className={cls || undefined}>
      {children}
    </Link>
  );
}

type Props = { onMenuClick?: () => void };

export default function Topbar({ onMenuClick = () => {} }: Props) {
  const { pathname } = useLocation();
  const { theme, toggle } = useTheme();

  const fromPlayground = pathname === '/playground' || pathname === '/playground.html';

  return (
    <div className="topbar">
      <TopbarLink to="/" fromPlayground={fromPlayground} className="site-name">
        <img
          src="/flaticon.png"
          alt=""
          style={{
            height: 24,
            width: 24,
            display: 'inline-block',
            verticalAlign: 'middle',
            marginRight: 8,
            position: 'relative',
            top: -1,
            flexShrink: 0,
          }}
        />
        o<span>Caml</span>Case
      </TopbarLink>
      <nav className="topbar-nav">
        {topbarLinks.map((link) => (
          <TopbarLink
            key={link.label}
            to={link.path}
            active={isTopbarActive(pathname, link)}
            fromPlayground={fromPlayground}
          >
            {link.label}
          </TopbarLink>
        ))}
      </nav>
      <div className="topbar-actions">
        <button
          className="theme-toggle"
          onClick={toggle}
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          title={theme === 'light' ? 'Dark mode' : 'Light mode'}
        >
          {theme === 'light' ? (
            // Moon icon
            <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" aria-hidden="true">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          ) : (
            // Sun icon
            <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
        <a
          href="https://github.com/kheif/oCamlCase"
          target="_blank"
          rel="noopener noreferrer"
          className="topbar-github"
          aria-label="GitHub repository"
        >
          <svg viewBox="0 0 16 16" width="18" height="18" aria-hidden="true" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
        </a>
        <button className="menu-btn" onClick={onMenuClick}>
          ☰
        </button>
      </div>
    </div>
  );
}
