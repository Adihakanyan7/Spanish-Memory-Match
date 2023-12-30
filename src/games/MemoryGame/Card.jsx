import React from "react";
import "../../styles/Card.css"

function Card(props) {
    console.log('Card render!')
    let cardClasses = `card ${props.isInvisible ? 'invisible' : ''}`;
    
    return (
      <div className={cardClasses} onClick={props.clickShow}>
        {props.isFlipped && props.isMatched ? 
          <div className="card-content-match">
            {props.content}
          </div>
          : props.isFlipped ?
          <div className="card-content">
            {props.content}
          </div>
          :
          <div className="card-back">
            {props.title}
          </div>
        }
      </div>
    );
  }
  


export default Card;