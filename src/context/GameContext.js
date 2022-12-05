import { createContext, useReducer } from "react";
import { useState, useEffect } from "react";
import * as gameServices from '../services/gameServices';
import { useNavigate } from "react-router-dom";

export const GameContext = createContext();


const gameReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_GAMES':
      return [...action.payload];
    case 'ADD_GAME':
      return [...state, action.payload];
    case 'EDIT_GAME':
      return state.map(x => x._id === action.gameId ? action.payload : x);
    default:
      return state;
  }
};

export const GameProvider = ({
  children,
}) => {


  const [games, dispatcher] = useReducer(gameReducer, []);

  const navigate = useNavigate();


  useEffect(() => {
    gameServices.getAll()
      .then(result => {
        const action = {
          type: 'ADD_GAMES',
          payload: result

        };
        dispatcher(action);
      });
  }, []);

  const addCommnet = (gameId, comment) => {
    //  setGames(state => {
    //   const game = state.find(x => x._id === gameId);//namira id-to na igrata koqto e v momenta(na koqto iskame da dobavi komentar)
    //   const comments = game.comments || [];// suzdava se masiv s komenatri ili ako nqma pravq prazen masivv
    //   comments.push(comment)//dobavqme noviq komentar
    //    return [//tova promenq state 
    //     ...state.filter(x => x._id !== gameId),//pusni vsichki igri koito ne otgovarqt na tazi koqto iskame da dobawim 
    //      { ...game.comments },//dobavi nov obekt kato i dobavq noviq komentar
    //    ];
    //   })
  };

  const gameAdd = (gameData) => {
    dispatcher({
      type: 'ADD_GAME',
      payload: gameData
    })
    navigate('/catalog')
  };


  const gameEdit = (gameId, gameData) => {
    //setGames(state => state.map(x => x._id === gameId ? gameData : x));
    dispatcher({
      type: 'EDIT_GAME',
      payload: gameData,
      gameId,
    })
  }

  return (
    <GameContext.Provider value={{ games, gameAdd, gameEdit, addCommnet }}>
      {children}
    </GameContext.Provider>
  )
}