import React from 'react';
import Container from './components/Container';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {


  return (
    <div className="container mx-auto">
      <div className="row justify-content-center"> 
        <div className="col-sm-8"> 
          <Container />
        </div>
      </div>
    </div>
  );
}

export default App;
