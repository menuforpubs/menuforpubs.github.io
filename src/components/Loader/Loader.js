import React, { useContext } from 'react';

import css from './Loader.module.scss';

import { MenuContext } from 'components/MenuProvider/MenuProvider';
import { FeaturesContext } from 'components/FeaturesProvider/FeaturesProvider';

export const MenuLoader = ({ children = null }) => {
  const { isFetching } = useContext(MenuContext);

  return <Loader isFetching={isFetching}>{children}</Loader>;
};

export const SettingsLoader = ({ children = null }) => {
  const { isFetching } = useContext(FeaturesContext);

  return <Loader isFetching={isFetching}>{children}</Loader>;
};

export const Loader = ({ children = null, isFetching }) =>
  isFetching ? (
    <div className={css['loader-container']}>
      <div className={css['loader']} />
    </div>
  ) : (
    children
  );

export default Loader;
