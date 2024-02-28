import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTopOnRender() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]); // Kører useEffect, når location.pathname ændrer sig

  return null;
}

export default ScrollToTopOnRender;
