import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { topbarLinks } from '../content/nav';
import { isTopbarActive } from '../lib/route-utils';

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
      <a
        href="https://github.com/kheif/oCamlCase"
        target="_blank"
        rel="noopener noreferrer"
        className="topbar-github"
        aria-label="GitHub repository"
      >
        <svg viewBox="0 0 16 16" width="20" height="20" aria-hidden="true" fill="currentColor">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
        </svg>
      </a>
      <button className="menu-btn" onClick={onMenuClick}>
        ☰
      </button>
    </div>
  );
}
