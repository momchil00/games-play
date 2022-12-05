import { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import LatestGame from '../LatestGame/LatestGame';
const Home = () => {

    const {games} = useContext(GameContext);

    return (
        <section id="welcome-world">
            <div className="welcome-message">
                <h2>ALL new games are</h2>
                <h3>Only in GamesPlay</h3>
            </div>
            <img alt="hero" src="./images/four_slider_img01.png" />
            <div id="home-page">
                <h1>Latest Games</h1>

                {games.length > 0
                    ? games.map(x => <LatestGame key={x._id} game={x} />)
                    : <p className="no-articles">No games yet</p>

                }

                {/* Display paragraph: If there is no games  */}
            </div>
        </section>
    );
}

export default Home