import React from 'react';
import './App.css';

import { StateContextProvider } from './state/appStateProvider';
import Layout from './components/layout';

function App() {
  return (
    <div className="App">
      <StateContextProvider >
        <Layout />
      </StateContextProvider>
    </div>
  );
}

export default App;
