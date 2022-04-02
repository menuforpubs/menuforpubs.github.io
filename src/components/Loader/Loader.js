import React, { useContext } from 'react';
import classNames from 'classnames/bind';

import css from './Loader.module.scss';

import { MenuContext } from 'components/MenuProvider/MenuProvider';
import { FeaturesContext } from 'components/FeaturesProvider/FeaturesProvider';

const cx = classNames.bind(css);

export const MenuLoader = ({ children = null }) => {
  const { isFetching } = useContext(MenuContext);

  return <Loader isFetching={isFetching}>{children}</Loader>;
};

export const SettingsLoader = ({ children = null }) => {
  const { isFetching } = useContext(FeaturesContext);

  return <Loader isFetching={isFetching}>{children}</Loader>;
};

export const Loader = ({
  children = null,
  isFetching,
  shouldRenderInTheBackground = false,
}) => {
  if (shouldRenderInTheBackground) {
    return (
      <>
        <div className={cx('loader-container', { hidden: !isFetching })}>
          <div className={css['loader']} />
        </div>
        <div className={cx({ hidden: isFetching })}>{children}</div>
      </>
    );
  }

  return isFetching ? (
    <div className={css['loader-container']}>
      <div className={css['loader']} />
    </div>
  ) : (
    children
  );
};

export default Loader;
