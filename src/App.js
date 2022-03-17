import { useEffect } from 'react';

import './App.css';

import Routes from './components/Routes/Routes';
import MenuProvider from 'components/MenuProvider/MenuProvider';

function App() {
  useEffect(() => {
    const timerToRefresh = setTimeout(() => {
      window.location.reload();
    }, 120000);

    return () => clearTimeout(timerToRefresh);
  }, []);

  return (
    <MenuProvider>
      <Routes />
    </MenuProvider>
  );
}

export default App;
