import { useContext } from 'react';
import getOr from 'lodash/fp/getOr';

import { MenuContext } from 'components/MenuProvider/MenuProvider';

export const useFeature = () => {
  const { menuData } = useContext(MenuContext);
  return getOr({}, 'features', menuData);
};
