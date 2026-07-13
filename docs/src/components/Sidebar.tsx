import { useMemo, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getNavGroups } from '../content/nav';
import { isActive } from '../lib/route-utils';
import { useLearnMode } from '../learn/learn-mode-context';
import { useFlip } from '../hooks/useFlip';

type Props = { open: boolean; onClose: () => void };

export default function Sidebar({ open, onClose }: Props) {
  const { pathname } = useLocation();
  const { mode } = useLearnMode();
  const navGroups = useMemo(() => getNavGroups(mode), [mode]);
  const navRef = useRef<HTMLElement>(null);
  useFlip(navRef, mode);

  return (
    <aside className={`sidebar${open ? ' open' : ''}`} id="sidebar">
      <nav ref={navRef}>
        {navGroups.map((group) => (
          <div className="nav-group" key={group.label}>
            <span className="nav-label">{group.label}</span>
            {group.links.map((link) =>
              link.subHeader ? (
                <span key={link.label} className="nav-sub-label">
                  {link.label}
                </span>
              ) : (
                <Link
                  // num disambiguates intentional repeats (e.g. Static Semantics is
                  // both a standalone lab and step 3 of the interpreter sequence)
                  key={`${link.num}${link.path}${link.label}`}
                  to={link.path}
                  data-flip-key={group.label === 'Interactive Labs' ? undefined : link.path}
                  className={`nav-link${isActive(pathname, link.path) ? ' active' : ''}`}
                  onClick={onClose}
                >
                  <span className="nav-num">{link.num}</span>
                  {link.label}
                </Link>
              ),
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
