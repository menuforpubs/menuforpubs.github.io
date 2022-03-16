import React, { useState, createContext, useCallback, useEffect } from 'react';

import { getDocumentData, updateDocument } from 'utils/api.utils';

import ErrorNotification from 'components/ErrorNotification/ErrorNotification';

export const MenuContext = createContext({});

const MenuProvider = ({ children }) => {
  const [menuData, setMenuData] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const [errorMsg, setErrorMsg] = useState();

  const getMenuData = useCallback(async (pubName) => {
    setMenuData(await getDocumentData('menus', pubName));
  }, []);

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
      console.log(updatedSection);
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
