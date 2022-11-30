import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import {Routes,Route} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import CreateGame from './components/CreateGame';
import Catalog from './components/Catalog';
function App() {
  return (
    <div id="box">
      <Header />
      <main id="main-content">
        <Routes>
          <Route path="/" element ={<Home/>}/>
          <Route path="/login" element ={<Login/>}/>
          <Route path="/register" element ={<Register/>}/>
          <Route path="/create" element ={<CreateGame/>}/>
          <Route path="/games" element ={<Catalog/>}/>

        </Routes>

      </main>


    </div>

  );

}

export default App;
