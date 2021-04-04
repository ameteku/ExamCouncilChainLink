import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import {Route, Link} from "react-router-dom";
import Home from "./Home";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Home}/>
    </div>
  );
}

export default App;
