import React from 'react';
import logo from './logo.svg';
import './App.css';

import Home from './views/Home'
import Navigation from './components/Navigation'



import { BrowserRouter as Router, Routes, Route,Link  } from 'react-router-dom';


function App() {
  return (
    <div class="bg app">
        <Navigation />
        <Router >         
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
           
            
            </Routes>
        </Router> 
      

    </div>
  );
}

export default App;
