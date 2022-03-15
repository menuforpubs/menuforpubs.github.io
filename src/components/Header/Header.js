import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import get from 'lodash/fp/get';

import css from './Header.module.scss';

import { MenuContext } from 'components/MenuProvider/MenuProvider';

import { ReactComponent as BackIcon } from 'assets/images/back.svg';

import { usePermissons } from 'hooks/usePermissions';
import { getQueryParamsStr } from 'utils/queryString.utils';

const Header = ({ match }) => {
  const { menuData = {} } = useContext(MenuContext);

  const pubName = get('params.pubName', match);
  const path = get('params.path', match);

  const { key } = usePermissons();

  return (
    <div className={css['container']}>
      {path === 'menu' ? (
        <div className={css['logo']}>{menuData.name}</div>
      ) : (
        <Link
          to={`/${pubName}/menu${key ? getQueryParamsStr({ key }) : ''}`}
          className={css['back-button']}
        >
          <BackIcon className={css['back-icon']} />
          <div>חזרה לתפריט</div>
        </Link>
      )}
    </div>
  );
};

export default Header;
