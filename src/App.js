import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import {Routes,Route, useNavigate} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import CreateGame from './components/CreateGame';
import Catalog from './components/Catalog';
import { useEffect, useState } from 'react';
import * as gameServices from '../src/services/gameServices';
import GameDetails from './components/GameDetails';
import uniqid from 'uniqid';

function App() {
  const [games, setGames] = useState([]);
  
  const navigate = useNavigate();

  const addCommnet = (gameId, comment) => {
    setGames(state => {
      const game = state.find(x => x._id === gameId);//namira id-to na igrata koqto e v momenta(na koqto iskame da dobavi komentar)
      const comments = game.comments || [];// suzdava se masiv s komenatri ili ako nqma pravq prazen masivv
      comments.push(comment)//dobavqme noviq komentar
      return [//tova promenq state 
        ...state.filter(x => x._id !== gameId),//pusni vsichki igri koito ne otgovarqt na tazi koqto iskame da dobawim 
        {...game.comments},//dobavi nov obekt kato i dobavq noviq komentar
      ];
    })
  };

  const addGameHandler = (gameData) => {

    setGames(state => [
      ...state,
      {
        ...gameData,
        _id: uniqid(),
      },
    ]);
    navigate('/catalog')
  };

console.log(games, 'that is');

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
          <Route path="/logout" element ={<Home />}/>
          <Route path="/login" element ={<Login/>}/>
          <Route path="/register" element ={<Register/>}/>
          <Route path="/create" element ={<CreateGame addGameHandler={addGameHandler}/>}/>
          <Route path="/catalog" element ={<Catalog games={games}/>}/>
          <Route path="/catalog/:gameId" element ={<GameDetails games={games} addCommnet={addCommnet}/>}/>

        </Routes>

      </main>


    </div>

  );

}

export default App;


{/* Edit Page ( Only for the creator )*/}
{/*
<section id="edit-page" className="auth">
  <form id="edit">
    <div className="container">
      <h1>Edit Game</h1>
      <label htmlFor="leg-title">Legendary title:</label>
      <input type="text" id="title" name="title" defaultValue="" />
      <label htmlFor="category">Category:</label>
      <input type="text" id="category" name="category" defaultValue="" />
      <label htmlFor="levels">MaxLevel:</label>
      <input
        type="number"
        id="maxLevel"
        name="maxLevel"
        min={1}
        defaultValue=""
      />
      <label htmlFor="game-img">Image:</label>
      <input type="text" id="imageUrl" name="imageUrl" defaultValue="" />
      <label htmlFor="summary">Summary:</label>
      <textarea name="summary" id="summary" defaultValue={""} />
      <input className="btn submit" type="submit" defaultValue="Edit Game" />
    </div>
  </form>
</section>

*/}