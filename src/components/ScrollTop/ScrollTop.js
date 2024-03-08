import { useLocation } from 'react-router-dom';
import React from 'react';

const ScrollTop = () => {
  // Aux functions
  const scrollTop = () => {
    const app = document?.querySelector('.App');
    if (app) {
      setTimeout(() => app.scrollIntoView({ behavior: 'smooth' }), 200);
    }
  };

  // Scroll top when route change
  const { pathname } = useLocation();
  React.useEffect(scrollTop, [pathname]);

  return <></>;
};

export default ScrollTop;
