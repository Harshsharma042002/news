import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import News from './pages/News';
import Login from './pages/Login';
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/news' element={<News/>} />
          <Route path='/login' element={<Login/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
