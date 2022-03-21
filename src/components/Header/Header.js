import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import get from 'lodash/fp/get';

import css from './Header.module.scss';

import { getQueryParamsStr } from 'utils/queryString.utils';

import { MenuContext } from 'components/MenuProvider/MenuProvider';

import AdminUser from 'components/AdminUser/AdminUser';
import { ReactComponent as BackIcon } from 'assets/images/back.svg';
import { ReactComponent as SettingsIcon } from 'assets/images/settings.svg';

import { usePermissons } from 'hooks/usePermissions';

const Header = ({ match }) => {
  const { menuData = {} } = useContext(MenuContext);

  const pubName = get('params.pubName', match);
  const path = get('params.path', match);

  const { key } = usePermissons();

  const queryString = useMemo(
    () => (key ? getQueryParamsStr({ key }) : ''),
    [key]
  );

  return (
    <div className={css['container']}>
      {path === 'menu' ? (
        <div className={css['logo']}>
          {menuData.name}
          <AdminUser>
            <Link to={`/${pubName}/settings${queryString}`}>
              <SettingsIcon className={css['settings-icon']} />
            </Link>
          </AdminUser>
        </div>
      ) : (
        <Link
          to={`/${pubName}/menu${queryString}`}
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
