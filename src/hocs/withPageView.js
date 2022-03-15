import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { analytics } from 'firebase-config';
import { logEvent, setCurrentScreen } from 'firebase/analytics';

const logCurrentPage = () => {
  console.log(window.location.pathname);
  setCurrentScreen(analytics, window.location.pathname);
  logEvent(analytics, 'screen_view');
};

export const withPageView = (Component) => (props) => {
  const history = useHistory();
  useEffect(() => {
    // logCurrentPage(); // log the first page visit
  }, [history]);

  return <Component {...props} />;
};
