import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Pour détecter les changements d'URL
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]); // Met à jour à chaque changement d'URL

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">Mon Projet</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Accueil</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/recommandations">Recommandations</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/carte">Carte</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/chatbot">Chatbot</NavLink>
            </li>

            {isLoggedIn && (
              <li className="nav-item">
                <button className="btn btn-outline-light ms-3" onClick={handleLogout}>
                  Se déconnecter
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
