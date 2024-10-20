import React from 'react';
import { Link } from 'react-router-dom';
import logo from './images/logo.jpeg'; // Asegúrate de tener esta imagen en tu proyecto

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg custom_nav-container pt-3">
      <Link className="navbar-brand" to="/">
        <img src={logo} alt="Logo" />
      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="menu-top">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link pl-0" to="/">Inicio <span className="sr-only">(current)</span></Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#sitios">Sitios de Interés</a> {/* Enlace interno */}
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#rutas">Rutas</a> {/* Enlace interno */}
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#about">Nosotros</a> {/* Enlace interno */}
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#contact">Contáctenos</a> {/* Enlace interno */}
          </li>
        </ul>
      </div>

      <div className="user_option">
        <div className="login_btn-container">
          <Link to="/login">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
