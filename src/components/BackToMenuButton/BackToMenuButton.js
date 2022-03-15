import React from 'react';

const BackToMenuButton = ({ pubName, key }) => (
  <Link to={`/${pubName}/menu`} className={css['back-button']}>
    <BackIcon className={css['back-icon']} />
    חזרה
  </Link>
);

export default BackToMenuButton;
