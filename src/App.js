import React from 'react';
import './styles/App.css';
import Header from './components/header';
import Marcas from './components/marcas';
import AddVehiculo from './components/addvehiculo';

function App() {
  return (
    <div className="App" >
      <Header />
      <AddVehiculo />
      <Marcas />
    </div>
  );
}

export default App;
