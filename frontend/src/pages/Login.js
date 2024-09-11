import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; 

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); 

  return (
    <div className="auth">
      {isLogin ? (
        <>
          <LogIn />
          <p className="toggle-link">
            New user? <button onClick={() => setIsLogin(false)}>Click here to register</button>
          </p>
        </>
      ) : (
        <>
          <Register />
          <p className="toggle-link">
            Already registered? <button onClick={() => setIsLogin(true)}>Click here to login</button>
          </p>
        </>
      )}
    </div>
  );
};

const LogIn = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [cookies, setCookies] = useCookies(['SECRET_KEY']);  
  const navigate = useNavigate(); 

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/user/login', {
        email,
        password,
      });

      // Store token in cookies
      setCookies('SECRET_KEY', response.data.token);

      // Store userId in localStorage
      window.localStorage.setItem('userId', response.data.userId);
      
      // Navigate to home
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      password={password}
      email={email}
      setEmail={setEmail}
      setPassword={setPassword}
      label="Login"
      onSubmit={onSubmit}
    />
  );
};

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:8000/user/register', {
        username,
        email,
        password,
      });
      alert('Registration is completed! Now login.');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      username={username}
      password={password}
      email={email}
      setEmail={setEmail}
      setPassword={setPassword}
      setUsername={setUsername}
      label="Register"
      onSubmit={onSubmit}
    />
  );
};

const Form = ({ username, setUsername, email, setEmail, password, setPassword, label, onSubmit }) => {
  return (
    <div className="auth-container">
      <form onSubmit={onSubmit}>
        <h2>{label}</h2>
        {label === "Register" && (
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">{label}</button>
      </form>
    </div>
  );
};

export default Login;
