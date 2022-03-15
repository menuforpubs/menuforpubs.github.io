import React, { useState, createContext, useCallback } from 'react';

import { getDocumentData, updateDocument } from 'utils/api.utils';

export const MenuContext = createContext({});

const MenuProvider = ({ children }) => {
  const [menuData, setMenuData] = useState();
  const [isFetching, setIsFetching] = useState(false);

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
      await updateDocument('menus', pubName, updatedSection);
      await getMenuData(pubName);
      setIsFetching(false);
    },
    [getMenuData]
  );

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
      {children}
    </MenuContext.Provider>
  );
};

export default MenuProvider;
