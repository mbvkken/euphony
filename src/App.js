import './App.css';
import React from 'react';
// import { useState, useEffect } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import { Navbar, TempNoNavBar } from './components/Navbar';
import { Header, GridContain, PageContain } from './AppStyle';
// import Add from './components/Add';
// import Edit from './components/Edit';
// import Delete from './components/Delete';
// import Search from './components/Search';
// import axios from 'axios';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Search from './components/Search';


function App() {
  return (
    <HashRouter>
     <Header><h2 style={{color: 'white', textAlign: 'center'}}>euphony.</h2></Header>
      <Switch>
        <Route path="/register" component={Login} />
        <Route path="/profile" component={Profile} />
        <Route path="/search" component={Search} />
        <Route path="/" component={Home} />;
      </Switch>

      <GridContain>
        
          <Switch>
            <Route component={Navbar} />
          </Switch>
        
      </GridContain>
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
