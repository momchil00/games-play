import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { GameContext } from '../context/GameContext';
import * as gameService from '../services/gameServices';
import * as commentService from '../services/commentsService';

const GameDetails = () => {

  const { addCommnet, fetchGameDetails, selectGame } = useContext(GameContext);
  const { gameId } = useParams();

  const currentGame = selectGame(gameId);


  useEffect(() => {
    (async () => {
      const gameDetails = await gameService.getOne(gameId);
      const gameComments = await commentService.getByGameId(gameId);
      fetchGameDetails(gameId, {...gameDetails, comments: gameComments.map(x => `${x.user.email}:${x.text}`)});

    })();
  }, [])

  const addCommentHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const comment = formData.get('comment');
    //addCommnet(gameId, `${comment.username}: ${comment.comment}`);

    commentService.create(gameId, comment)
      .then(result => {
        addCommnet(gameId, comment);
      });

  };


  return (
    <section id="game-details">
      <h1>Game Details</h1>
      <div className="info-section">
        <div className="game-header">
          <img className="game-img" src={currentGame.imageUrl} alt="" />
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
          <ul>
            {currentGame.comments?.map(x =>
              <li key ={x.id} className="comment" >
                <p>{x}</p>
              </li>
            )}
          </ul>

          {!currentGame.comments &&
            <p className="no-comment">No comments.</p>
          }

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

          <textarea
            name="comment"
            placeholder="Comment......"
          />
          <input
            className="btn submit"
            type="submit"
            value="Add Comment"
          />
        </form>
      </article>
    </section >
  );
};

export default GameDetails;
