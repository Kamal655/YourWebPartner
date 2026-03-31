import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';
import { supabase } from '@/integrations/supabase/client';

/**
 * Listens to every route change and sends a virtual page‑view
 * to Google Analytics 4. Drop it once, anywhere inside the Router tree.
 */
export default function GAListener() {
  const location = useLocation();

  useEffect(() => {
    // Current GA tracking
    ReactGA.send({ hitType: 'pageview', page: location.pathname });

    // New: Track to Supabase
    const trackPageView = async () => {
      try {
        await supabase
          .from('page_views')
          .insert([
            {
              page_path: location.pathname,
              user_agent: navigator.userAgent
            }
          ]);
      } catch (error) {
        console.error('Error tracking page view:', error);
      }
    };

    // basic debounce or just fire-and-forget
    trackPageView();

  }, [location]);        // fires whenever the URL changes

  return null;           // nothing to render
}
