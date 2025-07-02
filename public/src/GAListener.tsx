import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

/**
 * Listens to every route change and sends a virtual page‑view
 * to Google Analytics 4.  Drop it once, anywhere inside the Router tree.
 */
export default function GAListener() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: location.pathname });
  }, [location]);        // fires whenever the URL changes

  return null;           // nothing to render
}
