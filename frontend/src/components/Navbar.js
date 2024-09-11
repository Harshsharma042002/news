import React from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Navbar.css';

const Navbar = () => {
  const [cookies, setCookies, removeCookies] = useCookies(['SECRET_KEY']);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/user/logout');
      
      removeCookies('SECRET_KEY');
      window.localStorage.removeItem('userId');

      navigate('/login');
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

  return (
    <div className='navbar'>
      <div className='logo'>
        <h1>NEWS</h1>
      </div>
      <div className='all-links'>
        <Link to='/'>Home</Link>
        <Link to='/news'>News</Link>
        {!cookies.SECRET_KEY ? (
          <Link to='/login'>Login</Link>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;

