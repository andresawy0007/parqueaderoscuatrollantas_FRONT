import React from 'react';
import './styles/App.css';
import Header from './components/header';
import AddVehiculo from './components/addvehiculo';
import Demo from './components/demo';

function App() {
  return (
    <div className="App" >
      <Header />
      <div id="contPrincipalVehiculos">
        <AddVehiculo /> 
        <Demo />
      </div>     
    </div>
  );
}

export default App;
