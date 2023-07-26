import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route,Link  } from 'react-router-dom';


import Home from './views/Home'
import Cryptonewspage from './views/Cryptonewspage';
import Forexpage from './views/Forexpage'
import SearchCryptopage from './views/SearchCryptopage'
import Stocknewspage from './views/Stocknewspage'


import Navigation from './components/Navigation';
import Footer from './components/Footer';



function App() {
  return (
    <div class="bg app">
        <Navigation />
        <Router >         
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route path="/SearchCryptopage" element={<SearchCryptopage />}></Route>
              <Route path="/Cryptonewspage" element={<Cryptonewspage />}></Route>
              <Route path="/Forexpage" element={<Forexpage />}></Route>
              <Route path="/Stocknewspage" element={<Stocknewspage />}></Route>
            </Routes>
        </Router> 
        <Footer />
      

    </div>
  );
}

export default App;
