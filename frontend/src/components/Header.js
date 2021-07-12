import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../style/App.css";
import logo from '../logo.png'

function Header() {
  return (
    <div className="container">
      <header>
        <ul>
          <li className="icono">Icono</li>
          <li className="logo">
            <a><img src={logo}></img></a>
          </li>
          <li className="search">
            <a href="">
             <i> <FontAwesomeIcon
                icon={faSearch}
                className="text-black"
                size="2x"
              /></i>
            </a>
            <input placeholder="Buscar"></input>
          </li>
          <li className="buttonSesion">
            <a href="#">Cerrar sesión</a>
          </li>
        </ul>
      </header>
    </div>
  );
}

export default Header;