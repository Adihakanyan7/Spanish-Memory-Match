import React from "react";
import { Link } from 'react-router-dom'; // Import Link

function OpeningGame(props) {
  return (
    <div className="game-options">
      <ul className="game-list">
        {props.gameNames.map(element => (
          <li key={element} className="game-option">
            {/* Use Link component for client-side routing */}
            <Link to={"/game/" + element.replace(/\s+/g, '-').toLowerCase()} className="game-link">
              {element}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OpeningGame;
