import React from 'react';
import left from '../Assests/left.jpg';
import center from '../Assests/center.jpg';
import right from '../Assests/right1.jpg';
import '../styles/Home.css';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer'; 

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className='home'>
            <h1 className='heading'>NEWS by HARSH</h1>
            <div className='top'>
                <img src={center} alt='error' />
            </div>
            <div className='bottom'>
                <div className='bottom-left'>
                    <h1>Get the Fastest News Updates in Real-Time</h1>
                    <p>We deliver the latest news as it happens, keeping you informed at lightning speed.</p>
                    <img src={left} alt='error' />
                </div>
                <div className='bottom-right'>
                    <h1>Get the latest news</h1>
                    <img src={right} alt="error" />
                    <button className="navigate-button" onClick={() => navigate('/login')}>Get started</button>
                </div>
            </div>
            <Footer /> 
        </div>
    );
};

export default Home;
