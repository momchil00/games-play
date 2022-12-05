import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { GameContext } from '../context/GameContext';
import * as gameService from '../services/gameServices';
const GameDetails = () => {

  const {addCommnet} = useContext(GameContext);
  const { gameId } = useParams();
  const [currentGame, setCurrentGame] = useState({});

  const [comment, setComment] = useState({
    username: '',
    comment: '',
  });

  useEffect(() => {
    gameService.getOne(gameId)
      .then(result => {
        setCurrentGame(result);
      })
  })

  const [error, setError] = useState({
    username: '',
    comment: '',
  });



  const addCommentHandler = (e) => {
    e.preventDefault();
    addCommnet(gameId, `${comment.username}: ${comment.comment}`);

  }

  const onChange = (e) => {
    e.preventDefault();

    setComment(state => ({
      ...state,
      [e.target.name]: e.target.value


    }));
  };

  const validateUsername = (e) => {
    const username = e.target.value;

    if (username == e.target.length < 4) {
      setError(state => ({
        ...state,
        username: 'Username must ber longer than 3 symbols'
      }));
    }
  };



  return (
    <section id="game-details">
      <h1>Game Details</h1>
      <div className="info-section">
        <div className="game-header">
          <img className="game-img" src={currentGame.imageUrl} alt=""/>
          <h1>{currentGame.title}</h1>
          <span className="levels">MaxLevel:{currentGame.maxLevel}</span>
          <p className="type">{currentGame.category}</p>
        </div>
        <p className="text">
          {currentGame.summary}
        </p>
        {/* Bonus ( for Guests and Users ) */}
        <div className="details-comments">
          <h2>Comments:</h2>
          {/*
                        {currentGame.comments?.map(x =>
                            <li className="comment" >
                                <p>{x}</p>
                            </li>
                            )}
                    </ul>
                    {currentGame.comments &&
                    <p className="no-comment">No comments.</p>
                    */}

          {/* Display paragraph: If there are no games in the database */}
        </div>
        {/* Edit/Delete buttons ( Only for creator of this game )  */}
        <div className="buttons">
          <Link to={`/games/${gameId}/edit`} className="button">
            Edit
          </Link>
          <a href="/#" className="button">
            Delete
          </a>
        </div>
      </div>
      {/* Bonus */}
      {/* Add Comment ( Only for logged-in users, which is not creators of the current game ) */}
      <article className="create-comment">
        <label>Add new comment:</label>
        <form className="form" onSubmit={addCommentHandler}>
          <input
            type="text"
            name="username"
            placeholder="John Doe"
            onChange={onChange}
            onBlur={validateUsername}
            value={comment.username}

          />
          <textarea
            name="comment"
            placeholder="Comment......"
            onChange={onChange}
            value={comment.comment}
          />
          <input
            className="btn submit"
            type="submit"
            value="Add Comment"
          />
        </form>
      </article>
    </section>
  );
};

export default GameDetails;
