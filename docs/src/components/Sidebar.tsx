import { Link, useLocation } from 'react-router-dom';
import { navGroups } from '../content/nav';
import { isActive } from '../lib/route-utils';

type Props = { open: boolean; onClose: () => void };

export default function Sidebar({ open, onClose }: Props) {
  const { pathname } = useLocation();

  return (
    <aside className={`sidebar${open ? ' open' : ''}`} id="sidebar">
      <nav>
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
                  key={link.path + link.label}
                  to={link.path}
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
