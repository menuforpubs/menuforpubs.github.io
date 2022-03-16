import React from 'react';

import css from './PubList.module.scss';

const PubList = () => {
  return (
    <div className={css['container']}>
      <div className={css['pub-container']}>
        <div className={css['pub-logo-container']}></div>
        <div className={css['pub-name']}>Villa</div>
      </div>
    </div>
  );
};

export default PubList;
