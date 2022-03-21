import { useContext } from 'react';
import getOr from 'lodash/fp/getOr';

import { FeaturesContext } from 'components/FeaturesProvider/FeaturesProvider';
import { MenuContext } from 'components/MenuProvider/MenuProvider';

export const useFeature = () => {
  const { menuData } = useContext(MenuContext);
  return getOr({}, 'features', menuData);
};
