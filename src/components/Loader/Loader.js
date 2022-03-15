import React, { useContext } from 'react';

import css from './Loader.module.scss';

import { MenuContext } from 'components/MenuProvider/MenuProvider';

const Loader = ({ children = null }) => {
  const { isFetching } = useContext(MenuContext);

  return isFetching ? (
    <div className={css['loader-container']}>
      <div className={css['loader']} />
    </div>
  ) : (
    children
  );
};

export default Loader;
