import React from "react";
import { Link } from 'react-router-dom';

function ChooseGame(props) {

  

  return (
    <div className="game-options">
      <h1> Choose A Game To Learn From ! </h1>
      <ul className="game-list">
        {props.gameNames.map(element => (
          <li key={element} className="game-option">
            <Link 
              to={{
                pathname: "/" + element.replace(/\s+/g, '-').toLowerCase() +"/game-option/",
              }} 
              className="game-link">
              {element}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChooseGame;
