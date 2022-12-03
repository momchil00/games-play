import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Logout from './components/Logout';
import Login from './components/Login';
import Register from './components/Register';
import CreateGame from './components/CreateGame';
import Catalog from './components/Catalog';
import { useEffect, useState } from 'react';
import * as gameServices from '../src/services/gameServices';
import GameDetails from './components/GameDetails';
import useLocalStorage from './hooks/useLocalStorage';
import { GameContext } from './context/GameContext';
import EditGame from './components/EditGame';

function App() {
  const [games, setGames] = useState([]);

  const [auth, setAuth] = useLocalStorage('auth', {});

  const navigate = useNavigate();


  const userLogin = (authData) => {
    setAuth(authData);
  }

  const userLogout = () => {
    setAuth({});
  };

  const addCommnet = (gameId, comment) => {
    setGames(state => {
      const game = state.find(x => x._id === gameId);//namira id-to na igrata koqto e v momenta(na koqto iskame da dobavi komentar)
      const comments = game.comments || [];// suzdava se masiv s komenatri ili ako nqma pravq prazen masivv
      comments.push(comment)//dobavqme noviq komentar
      return [//tova promenq state 
        ...state.filter(x => x._id !== gameId),//pusni vsichki igri koito ne otgovarqt na tazi koqto iskame da dobawim 
        { ...game.comments },//dobavi nov obekt kato i dobavq noviq komentar
      ];
    })
  };

  const gameAdd = (gameData) => {

    setGames(state => [
      ...state,
      gameData,
    ]);
    navigate('/catalog')
  };

  console.log(games, 'that is');


  const gameEdit = (gameId, gameData) => {
    setGames(state => state.map(x => x._id === gameId ? gameData: x));
  }

  useEffect(() => {
    gameServices.getAll()
      .then(result => {
        setGames(result);
      })
  }, []);



  return (
    <AuthContext.Provider value={{ user: auth, userLogin, userLogout }}>
      <div id="box">
        <Header />
        <GameContext.Provider value ={{games, gameAdd,gameEdit}}>
          <main id="main-content">
            <Routes>
              <Route path="/" element={<Home games={games} />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/create" element={<CreateGame/>} />
              <Route path="/games/:gameId/edit" element={<EditGame/>} />
              <Route path="/catalog" element={<Catalog games={games} />} />
              <Route path="/catalog/:gameId" element={<GameDetails games={games} addCommnet={addCommnet} />} />

            </Routes>

          </main>
        </GameContext.Provider>


      </div>
    </AuthContext.Provider>
  );

}

export default App;


