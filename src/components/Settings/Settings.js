import React, { useEffect, useContext } from 'react';
import Switch from 'react-switch';
import get from 'lodash/fp/get';
import getOr from 'lodash/fp/getOr';
import set from 'lodash/fp/set';

import css from './Settings.module.scss';

import { SettingsLoader, MenuLoader } from 'components/Loader/Loader';
import { FeaturesContext } from 'components/FeaturesProvider/FeaturesProvider';
import { MenuContext } from 'components/MenuProvider/MenuProvider';

const Settings = ({ match }) => {
  const { getFeaturesData, features } = useContext(FeaturesContext);
  const {
    menuData = {},
    getInitialMenuData,
    updateMenuData,
  } = useContext(MenuContext);
  const { features: menuFeatures = {} } = menuData;

  const pubName = get('params.pubName', match);

  useEffect(() => {
    getFeaturesData();
    getInitialMenuData(pubName);
  }, [getFeaturesData, getInitialMenuData, pubName]);

  const updateFeatureStatus = (newState, featureId) => {
    const newFeaturesState = set(featureId, newState, menuFeatures);
    updateMenuData(pubName, { features: newFeaturesState });
  };

  return (
    <div className={css['container']}>
      <SettingsLoader>
        <MenuLoader>
          {features &&
            features.map((feature) => (
              <div key={feature.id} className={css['feature-container']}>
                <div className={css['feature-info-container']}>
                  <div className={css['feature-name']}>{feature.title}</div>
                  {feature.description && (
                    <div className={css['feature-description']}>
                      {feature.description}
                    </div>
                  )}
                </div>

                <Switch
                  onChange={(newState) =>
                    updateFeatureStatus(newState, feature.id)
                  }
                  checked={getOr(false, feature.id, menuFeatures)}
                />
              </div>
            ))}
        </MenuLoader>
      </SettingsLoader>
    </div>
  );
};

export default Settings;
