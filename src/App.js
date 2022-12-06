import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Logout from './components/Logout';
import Login from './components/Login';
import Register from './components/Register';
import CreateGame from './components/CreateGame';
import Catalog from './components/Catalog';
import GameDetails from './components/GameDetails';
import { GameProvider } from './context/GameContext';
import EditGame from './components/EditGame';
import PrivateRoute from './components/common/PrivateRoute';
import RouteGuard from './components/common/RouteGuard';

function App() {

  return (
    <AuthProvider>
      <div id="box">
        <Header />
        <GameProvider>
          <main id="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/create" element={(<PrivateRoute><CreateGame /></PrivateRoute>)} />
              <Route element={<RouteGuard />} >
                <Route path="/games/:gameId/edit" element={<EditGame />} />
                <Route path="/logout" element={<Logout />} />
              </Route>
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/catalog/:gameId" element={<GameDetails />} />

            </Routes>

          </main>
        </GameProvider>


      </div>
    </AuthProvider>
  );

}

export default App;


