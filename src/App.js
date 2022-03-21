import { useEffect } from 'react';

import './App.css';

import Routes from './components/Routes/Routes';
import MenuProvider from 'components/MenuProvider/MenuProvider';
import FeaturesProvider from 'components/FeaturesProvider/FeaturesProvider';

function App() {
  useEffect(() => {
    const timerToRefresh = setTimeout(() => {
      window.location.reload();
    }, 120000);

    return () => clearTimeout(timerToRefresh);
  }, []);

  return (
    <MenuProvider>
      <FeaturesProvider>
        <Routes />
      </FeaturesProvider>
    </MenuProvider>
  );
}

export default App;
