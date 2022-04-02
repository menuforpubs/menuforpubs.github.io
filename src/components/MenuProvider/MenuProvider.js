import React, { useState, createContext, useCallback, useEffect } from 'react';
import get from 'lodash/fp/get';
import map from 'lodash/fp/map';
import set from 'lodash/fp/set';

import { getDocumentData, updateDocument } from 'utils/api.utils';
import { getFileAsync } from 'utils/file.utils';

import ErrorNotification from 'components/ErrorNotification/ErrorNotification';

export const MenuContext = createContext({});

const MenuProvider = ({ children }) => {
  const [menuData, setMenuData] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const [errorMsg, setErrorMsg] = useState();

  const getMenuData = useCallback(async (pubName) => {
    const menuData = await getDocumentData('menus', pubName);
    const menuDataWithImages = await getCategoriesImages(menuData);
    setMenuData(menuDataWithImages);
    return menuData;
  }, []);

  const getCategoriesImages = async (menuData) => {
    const sections = get('sections', menuData);
    const sectionsWithImages = await Promise.all(
      map(async ({ imagePath, ...rest }) => {
        let imageUrl;
        if (imagePath) {
          imageUrl = await getFileAsync(`categoriesSvgs/${imagePath}`);
        }
        return {
          ...rest,
          imagePath,
          imageUrl,
        };
      }, sections)
    );

    return set('sections', sectionsWithImages, menuData);
  };

  const getInitialMenuData = useCallback(
    async (pubName) => {
      if (!menuData) {
        setIsFetching(true);
        await getMenuData(pubName);
        setIsFetching(false);
      }
    },
    [getMenuData, menuData]
  );

  const updateMenuData = useCallback(
    async (pubName, updatedSection) => {
      setIsFetching(true);
      try {
        await updateDocument('menus', pubName, updatedSection);
      } catch (e) {
        setErrorMsg('הייתה בעיה בשמירה, יש לפנות לתמיכה');
      }
      await getMenuData(pubName);
      setIsFetching(false);
    },
    [getMenuData]
  );

  useEffect(() => {
    if (errorMsg) {
      setTimeout(() => setErrorMsg(), 3000);
    }
  }, [errorMsg]);

  return (
    <MenuContext.Provider
      value={{
        menuData,
        setMenuData,
        isFetching,
        getInitialMenuData,
        updateMenuData,
      }}
    >
      {errorMsg && <ErrorNotification message={errorMsg} />}
      {children}
    </MenuContext.Provider>
  );
};

export default MenuProvider;
