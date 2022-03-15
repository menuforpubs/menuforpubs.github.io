import './App.css';

import Routes from './components/Routes/Routes';
import MenuProvider from 'components/MenuProvider/MenuProvider';

function App() {
  return (
    <MenuProvider>
      <Routes />
    </MenuProvider>
  );
}

export default App;
