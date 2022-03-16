import React from 'react';

import css from './ErrorNotification.module.scss';

const ErrorNotification = ({ message }) => {
  return <div className={css['container']}>{message}</div>;
};

export default ErrorNotification;
