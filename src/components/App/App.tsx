import { useState } from 'react';
import Header from '../Header/Header';
import HomePage from '../HomePage/HomePage';

import './App.scss';

function App() {
  const [isConnected, setIsConnected] = useState(true);

  return (
    <div className="app">
      <Header isConnected={isConnected} />
      <HomePage isConnected={isConnected} />
    </div>
  );
}

export default App;
