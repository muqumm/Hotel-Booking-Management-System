import axios from 'axios';
import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import About from './pages/About';
import Admin from './pages/Admin';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Login from './pages/Login';

// Configure axios to send cookies with requests
axios.defaults.withCredentials = true;

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/check');
        setIsAdmin(response.data.authenticated);
      } catch (error) {
        console.error('Auth check failed:', error);
      }
    };
    checkAuth();
  }, []);

  const handleLogin = () => {
    setIsAdmin(true);
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout');
      setIsAdmin(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Router>
      <div className="App">
        <Navbar isAdmin={isAdmin} onLogout={handleLogout} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/admin/*" element={<Admin onLogout={handleLogout} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;