import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

/**
 * Reset window scroll on forward navigations (PUSH/REPLACE), for every route --
 * including the full-screen ones that render outside <Layout>. Back/forward
 * (POP) is left to the browser's own scroll restoration.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType !== 'POP') window.scrollTo(0, 0);
  }, [pathname, navigationType]);

  return null;
}
