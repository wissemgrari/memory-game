import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Game from './pages/Game';
import Stats from './pages/Stats';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/play' element={<Game />} />
          <Route path='/stats' element={<Stats />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
