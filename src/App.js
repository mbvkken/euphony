import './App.css';
import React from 'react';
// import { useState, useEffect } from 'react';
import Home from './components/Home';
import Login from './components/Login';
// import Add from './components/Add';
// import Edit from './components/Edit';
// import Delete from './components/Delete';
// import Search from './components/Search';
// import axios from 'axios';
import { HashRouter, Switch, Route } from 'react-router-dom';


function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/register" component={Login} />
        <Route path="/" component={Home} />;
      </Switch>
    </HashRouter>
  )
}

// module.exports = {
//   addNumbers(a, b) {
//     return a + b;
//   },

//   subtractNumbers(a,b) {
//     return a - b;
//   }
// }

export default App;
