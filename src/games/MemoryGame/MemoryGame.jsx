import {useState, useEffect} from "react";
import { useNavigate  } from 'react-router-dom';
import Card from "./Card";
import "../../styles/MemoryGame.css"

function MemoryGame(props){
  const navigate = useNavigate();
  const [gameEnd, setGameEnd] = useState({end: false, win: false, life: 0, matchCards: 0});
  const [deck, setDeck] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [isChecking, setIsChecking] = useState(false);



    // Biulding the Deck  --------------------------------------------->

    // Extract words for the selected category
    const selectedCategoryWords = props.wordsDict[props.content.category];
    
    // When lvl or words is change biuld a new deck
    useEffect(() => {
      BiuldDeack(props.content.level, selectedCategoryWords);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.content.level, props.content.category]);

    function BiuldDeack(lvl, words) {
      if (!words) {
        console.error('Words data is undefined');
        return;
      }
        let numberOfPairs;
        switch (lvl) {
          case 'Easy':
            numberOfPairs = 5;
            break;
          case 'Medium':
            numberOfPairs = 10;
            break;
          case 'Hard':
            numberOfPairs = 20;
            break;
          default:
            numberOfPairs = 10;
        }
        
        createMemoryDeck(words, numberOfPairs);
    }

    function createMemoryDeck(words, numberOfPairs) {
      if (!words) {
        console.error('Words data is undefined');
        return;
      }
        // Select random unique indices from the words array
        const selectedIndices = getRandomIndexes(words.length, numberOfPairs);
      
        // Split the selected word pairs into separate Spanish and Hebrew arrays
        const spanishWords = selectedIndices.map(index => ({ word: words[index].Spanish, language: 'Spanish', pairIndex: index }));
        const hebrewWords = selectedIndices.map(index => ({ word: words[index].Hebrew, language: 'Hebrew', pairIndex: index }));
      
        // Combine the arrays and shuffle them to create the deck
        //const deck = spanishWords.concat(hebrewWords).sort(() => Math.random() - 0.5);
        const deck = shuffle(spanishWords.concat(hebrewWords));
        // Add the isFlipped and isMatched properties to each card in the deck
        const preparedDeck = deck.map((card, index) => ({
          ...card,
          isFlipped: false,
          isMatched: false,
          isInvisible: false,
          index: index // Unique index for each card
        }));
      
        setDeck(preparedDeck);
      }
       
    function getRandomIndexes(length, count) {
        // Using set to ensur taht the number of index is be equal to count - beacue set don't have duplicates   
        const indexes = new Set();
        while (indexes.size < count) {
            // Geting random nubers between 0 to (length-1) 
            const index = Math.floor(Math.random() * length);
            indexes.add(index);
        }
        // Returning an array 
        return Array.from(indexes);
    }

    function shuffle(array){
      array.sort(() => Math.random() - 0.5);
      return array;
    }
    // ------------------------------------------------> Biulding the Deck



    // During the game ------------------------------------------------>
    function flipCardTo(index) {
      if (isChecking || flippedIndices.includes(index) || deck[index].isFlipped) {
        // Already checking or the card is already flipped or is being checked, do nothing
        return;
      }
    
      // Flip the card
      const newDeck = [...deck];
      newDeck[index].isFlipped = true;
      setDeck(newDeck);
    
      // Add the card to the flipped indices
      const newFlippedIndices = [...flippedIndices, index];
      setFlippedIndices(newFlippedIndices);
    
      // If two cards are flipped, check for a match after a short delay
      if (newFlippedIndices.length === 2) {
        setIsChecking(true);
        setTimeout(() => {
          const [firstIndex, secondIndex] = newFlippedIndices;
          const firstCard = newDeck[firstIndex];
          const secondCard = newDeck[secondIndex];
          if (firstCard && secondCard && firstCard.pairIndex === secondCard.pairIndex) {
            handleMatch(newFlippedIndices);
          } else {
            resetFlippedCards(newFlippedIndices);
          }
          setIsChecking(false);
          setFlippedIndices([]);
        }, 1000);
      }
    }
    
    
  // ---------------------------------------------------------> During the game 
  

  // When card fliped ------------------------------------------------>

    
  // When card fliped ------------------------------------------------>

  //  When match  ---------------------------------------------------->
  function handleMatch(indices) {
    // First, mark the cards as matched without making them invisible yet
    const newDeck = deck.map((card, index) => {
      if (indices.includes(index)) {
        return { ...card, isMatched: true };
      }
      return card;
    });
    setDeck(newDeck);
    
  
    // After the animation duration, set the cards to be invisible
    setTimeout(() => {
      setDeck(currentDeck => currentDeck.map((card, index) => {
        if (indices.includes(index)) {
          return { ...card, isInvisible: true };
        }
        return card;
      }));
    }, 2000);
  }
  

  // ------------------------------------------------> When match 
   
    function resetFlippedCards(indices) {
      const newDeck = deck.map((card, index) => {
        if (indices.includes(index)) {
          return { ...card, isFlipped: false };
        }
        return card;
      });
      setDeck(newDeck);
    }

  // ------------------------------------------------> When no match
      
  
  
  return (
        <div className="memory-game-container"> {/* Add className for styling */}
          {gameEnd.end? // if
          <div className="endGame">
            {gameEnd.win?
              <h2>win</h2>
              :
              <h2>Lose</h2>
          }
          </div>
          : // else
          <div>
            <h2>Spanish Words</h2>
          <div className="spanish-deck">
            {deck.filter((card) =>{
              return card.language === "Spanish"
            }).map((card) => {
              return <Card
                        key={card.index}
                        id={card.index}
                        title="Card"
                        content={card.word}
                        isFlipped={card.isFlipped}
                        isMatched={card.isMatched}
                        isInvisible={card.isInvisible? true : false}
                        clickShow={() => flipCardTo(card.index)}
                    />
            })
            }
          </div>
          <h2>Hebrew Words</h2>
          <div className="hebrew-deck">
            {deck.filter((card) =>{
              return card.language === "Hebrew"
            }).map((card) => {
              return <Card
                        key={card.index}
                        id={card.index}
                        title="Card"
                        content={card.word}
                        isFlipped={card.isFlipped}
                        isMatched={card.isMatched}
                        isInvisible={card.isInvisible? true : false}
                        clickShow={() => flipCardTo(card.index)}
                    />
            })
            }
          </div> 
          <form >
            <button 
              type="button" 
              className="back-button" 
              onClick={(event) => {
                event.preventDefault();
                navigate("/memory-card/game-option/")
              }}
            >
              Back
            </button>
            </form >
          </div>
          }
          
        </div>
         );
}


export default MemoryGame;
