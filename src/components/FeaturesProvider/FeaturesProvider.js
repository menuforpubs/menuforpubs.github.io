import React, { useState, createContext, useCallback, useEffect } from 'react';

import { getAllDocumentsFromCollection } from 'utils/api.utils';

export const FeaturesContext = createContext({});

const FeaturesProvider = ({ children }) => {
  const [featuresData, setFeaturesData] = useState();
  const [isFetching, setIsFetching] = useState(false);

  const getFeaturesData = useCallback(async () => {
    setIsFetching(true);
    setFeaturesData(await getAllDocumentsFromCollection('features'));
    setIsFetching(false);
  }, []);

  return (
    <FeaturesContext.Provider
      value={{
        getFeaturesData,
        isFetching,
        features: featuresData,
      }}
    >
      {children}
    </FeaturesContext.Provider>
  );
};

export default FeaturesProvider;
