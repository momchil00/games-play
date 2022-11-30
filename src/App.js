import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import {Routes,Route} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import CreateGame from './components/CreateGame';
import Catalog from './components/Catalog';
import { useEffect, useState } from 'react';
import * as gameServices from '../src/services/gameServices';


function App() {
  const [games, setGames] = useState([]);

  useEffect(() => {
      gameServices.getAll()
          .then(result => {
              setGames(result);
          })
  }, []);

  return (
    <div id="box">
      <Header />
      <main id="main-content">
        <Routes>
          <Route path="/" element ={<Home games={games}/>}/>
          <Route path="/login" element ={<Login/>}/>
          <Route path="/register" element ={<Register/>}/>
          <Route path="/create" element ={<CreateGame/>}/>
          <Route path="/games" element ={<Catalog games={games}/>}/>

        </Routes>

      </main>


    </div>

  );

}

export default App;
