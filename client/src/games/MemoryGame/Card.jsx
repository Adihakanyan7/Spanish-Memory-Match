import React, { useCallback, useEffect } from 'react';
import '../../styles/Card.css';
import { useDeckContext } from '../context.ts';

function Card({ id, flippedIndices, setFlippedIndices, isChecking, setIsChecking, setGameEnd, title }) {
  const {deck, setDeck} = useDeckContext();

  const curr_card = deck[id];
  let cardClasses = `card ${curr_card.isInvisible ? 'invisible' : ''}`;
  
  const isValidToFlip = useCallback(() => {
    if (isChecking || flippedIndices.includes(id) || curr_card.isFlipped) {
      return false;
    } else {
      return true;
    }
  }, [id, isChecking, flippedIndices, curr_card]);

  const turnCardPropertyToFlipped = useCallback(() => {
    const newDeck = [...deck];
    newDeck[id].isFlipped = true;
    setDeck(newDeck);
  }, [id, deck, setDeck]);

  const addCardToFlippedIndices = useCallback(() => {
    const newFlippedIndices = [...flippedIndices, id];
    setFlippedIndices(newFlippedIndices);
  }, [id, flippedIndices, setFlippedIndices]);

  const checkingIfMatch = useCallback(() => {
    const [firstIndex, secondIndex] = flippedIndices;
    const firstCard = deck[firstIndex];
    const secondCard = deck[secondIndex];
    return firstCard && secondCard && firstCard.pairIndex === secondCard.pairIndex;
  }, [flippedIndices, deck]);

  const handleMatch = useCallback(() => {
    const newDeck = deck.map((card, index) => {
      if (flippedIndices.includes(index)) {
        return { ...card, isMatched: true };
      }
      return card;
    });
    setDeck(newDeck);
    setGameEnd(prevState => ({
      ...prevState,
      matchCards: prevState.matchCards + 1,
    }));
  }, [flippedIndices, deck, setDeck, setGameEnd]);

  const resetFlippedCards = useCallback(() => {
    const newDeck = deck.map((card, index) => {
      if (flippedIndices.includes(index)) {
        return { ...card, isFlipped: false };
      }
      return card;
    });
    setDeck(newDeck);
  }, [flippedIndices, deck, setDeck]);

  useEffect(() => {
    if (flippedIndices.length === 2) {
      setIsChecking(true);
      const timer = setTimeout(() => {
        if (checkingIfMatch()) {
          handleMatch();
        } else {
          resetFlippedCards();
        }
        setIsChecking(false);
        setFlippedIndices([]);
      }, 1000);

      return () => clearTimeout(timer); // Cleanup timeout if the component unmounts
    }
  }, [flippedIndices, checkingIfMatch, handleMatch, resetFlippedCards, setIsChecking, setFlippedIndices]);

  const handleClick = () => {
    if (!isValidToFlip()) {
      return;
    }
    turnCardPropertyToFlipped();
    addCardToFlippedIndices();
  };

  return (
    <div className={cardClasses} onClick={handleClick}>
      {curr_card.isFlipped && curr_card.isMatched ? (
        <div className="card-content-match">
          {curr_card.word}
        </div>
      ) : curr_card.isFlipped ? (
        <div className="card-content">
          {curr_card.word}
        </div>
      ) : (
        <div className="card-back">
          {title}
        </div>
      )}
    </div>
  );
}

export default Card;
