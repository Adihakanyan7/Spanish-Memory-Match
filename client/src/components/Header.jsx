import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useUserContext} from "./userContext.ts";

const Header = () => {
  const {isLoggedIn, setIsLoggedIn} = useUserContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user authentication data
    localStorage.removeItem('authToken'); // Adjust based on where you store token
    setIsLoggedIn(false);
    navigate("/");
  };
    return (
        <header>
            <h1>Learning Spanish</h1>
            {isLoggedIn ? (
                <nav>
                    <Link to="/games">Home</Link>
                    <button onClick={handleLogout}>Logout</button>
                </nav>
            ) : (
                <nav>
                    <Link to="/">Login</Link>
                    <Link to="/register">Register</Link>
                </nav>
            )}
        </header>
    );
};

export default Header;
