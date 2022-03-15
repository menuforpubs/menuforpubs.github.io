import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import head from 'lodash/fp/head';
import get from 'lodash/fp/get';

import css from './CategoriesGrid.module.scss';

import { MenuContext } from 'components/MenuProvider/MenuProvider';
import Notification from 'components/Notification/Notification';
import Loader from 'components/Loader/Loader';

import { ReactComponent as BeerIcon } from 'assets/images/beer.svg';
import { ReactComponent as FoodIcon } from 'assets/images/food1.svg';
import { ReactComponent as CocktailIcon } from 'assets/images/cocktail.svg';
import { ReactComponent as AlcoholIcon } from 'assets/images/alcohol.svg';
import { ReactComponent as ColalIcon } from 'assets/images/cola.svg';

import { usePermissons } from 'hooks/usePermissions';
import { getQueryParamsStr } from 'utils/queryString.utils';

const ICONS = {
  beers: BeerIcon,
  food: FoodIcon,
  cocktails: CocktailIcon,
  alcohol: AlcoholIcon,
  drinks: ColalIcon,
};

const CategoriesGrid = ({ match = {} }) => {
  const { menuData = {}, getInitialMenuData } = useContext(MenuContext);

  const { sections, notifications } = menuData;

  const pubName = get('params.pubName', match);

  const { key, isAdmin } = usePermissons();

  useEffect(() => {
    getInitialMenuData(pubName);
  }, [getInitialMenuData, pubName]);

  return (
    <div className={css['container']}>
      <Loader>
        {notifications && (
          <Notification
            notification={head(notifications)}
            isAdmin={isAdmin}
            pubName={pubName}
          />
        )}
        <div className={css['categories-container']}>
          {sections &&
            sections.map(({ path, title }) => {
              const IconComp = ICONS[path];
              return (
                <Link
                  key={path}
                  className={css['category-container-link-test']}
                  to={`/${pubName}/section/${path}${
                    key
                      ? getQueryParamsStr({
                          key,
                        })
                      : ''
                  }`}
                >
                  <div className={css['category-container']}>
                    <IconComp />
                    <div className={css['label']}>{title}</div>
                  </div>
                </Link>
              );
            })}
        </div>
      </Loader>
    </div>
  );
};

export default CategoriesGrid;
