import React, {useEffect, useState} from "react";
import "../../styles/Card.css"

function Card(props) {
  
  const curr_card = props.deck[props.id];
  let cardClasses = `card ${curr_card.isInvisible ? 'invisible' : ''}`;
  
  function isValidToFlip(){
    if (props.isChecking || props.flippedIndices.includes(props.id) || props.deck[props.id].isFlipped) {
      // Already checking or the card is already flipped or is being checked, do nothing
      return false;
    }else{
      return true;
    }
  }

  function turnCardPropertyToFlipped(){
    // Flip the card in the deck
    const newDeck = [...props.deck];
    newDeck[props.id].isFlipped = true;
    props.setDeck(newDeck);
  }

  function addCardToFlippedIndices(){
    // Add the card to the flipped indices
    const newFlippedIndices = [...props.flippedIndices, props.id];
    props.setFlippedIndices(newFlippedIndices);
  }

  function checkingIfMatch(){
    const [firstIndex, secondIndex] = props.flippedIndices;
    const firstCard = props.deck[firstIndex];
    const secondCard = props.deck[secondIndex];
    if (firstCard && secondCard && firstCard.pairIndex === secondCard.pairIndex) {
      return true;
    }
    return false;
  }

  function handleMatch() {
    // First, mark the cards as matched without making them invisible yet
    const newDeck = props.deck.map((card, index) => {
      if (props.flippedIndices.includes(index)) {
        return { ...card, isMatched: true };
      }
      return card;
    });
    props.setDeck(newDeck);
    
    props.setGameEnd(prevState => ({
      ...prevState,
      matchCards: prevState.matchCards + 1
    }));

  }

  function resetFlippedCards() {
    const newDeck = props.deck.map((card, index) => {
      if (props.flippedIndices.includes(index)) {
        return { ...card, isFlipped: false };
      }
      return card;
    });
    props.setDeck(newDeck);
  }

  useEffect(()=>{
    //console.log("FlippedIndices.length after update:", props.flippedIndices.length);
    if (props.flippedIndices.length === 2) {
      //console.log("Two cards flipped, checking for match...");
      props.setIsChecking(true);
      setTimeout(() => {
        if (checkingIfMatch()) {
          console.log("Two cards flipped, checking for match...");
          handleMatch();
        } else {
          resetFlippedCards();
        }
        props.setIsChecking(false);
        props.setFlippedIndices([]);
      }, 1000);
    }
  },[props.flippedIndices, props.deck])

  function handleClick(){
    if(!isValidToFlip()){
      return ;
    }
    turnCardPropertyToFlipped();
    addCardToFlippedIndices();
  }


    return (
      <div className={cardClasses} onClick={handleClick}>
        {props.deck[props.id].isFlipped && props.deck[props.id].isMatched ? 
          <div className="card-content-match">
            {props.deck[props.id].word}
          </div>
          : props.deck[props.id].isFlipped ?
          <div className="card-content">
            {props.deck[props.id].word}
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