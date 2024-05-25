import { useState } from 'react';
import Header from './components/Header';
import MainPage from './components/MainPage';

import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <MainPage />
    </>
  );
}

export default App;
