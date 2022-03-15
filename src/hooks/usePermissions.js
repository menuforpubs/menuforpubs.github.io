import { useContext } from 'react';
import { useLocation } from 'react-router-dom';

import { getQueryParamsObj } from 'utils/queryString.utils';
import { getHashCode } from 'utils/hash.utils';

import { MenuContext } from 'components/MenuProvider/MenuProvider';

export const usePermissons = () => {
  const { menuData = {} } = useContext(MenuContext);
  const { key } = menuData;
  const location = useLocation();
  const { key: routeKey } = getQueryParamsObj(location);
  const isAdmin = getHashCode(routeKey) === key;

  return { isAdmin, key: isAdmin ? routeKey : null };
};
