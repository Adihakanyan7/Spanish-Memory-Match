import { useState, useEffect} from "react";
import { useLocation, useNavigate  } from 'react-router-dom';
import Card from "./Card";
import "../../styles/MemoryGame.css"

const LEVELS = {
  'Easy': 5,
  'Medium': 10,
  'Hard': 20,
};


function MemoryGame(props){
  const navigate = useNavigate();
  const location = useLocation();
  const words = location.state.words; // Get words passed from the game option
  //console.log("The words of the game: ", words);

  // Bulding Deck
  const [deck, setDeck] = useState([]);
  const [numOfPairs, setNumOfPairs] = useState(LEVELS[props.content.level] || 10);
  //stats for the cards
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [isChecking, setIsChecking] = useState(false);
  //End game 
  const [gameEnd, setGameEnd] = useState({end: false, win: false, life: 0, matchCards: 1});
  


    // Biulding the Deck  --------------------------------------------->

    // When lvl or words is change biuld a new deck
    useEffect(() => {
      BiuldDeack(props.content.level, words);
      //console.log("The Deck: " ,deck);

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.content.level, props.content.category]);

    function BiuldDeack(lvl, words) {
      if (!words) {
        console.error('Words data is undefined');
        return;
      }
      setNumOfPairs(LEVELS[lvl] || 10); // Update numOfPairs state
      //console.log("setNumOfPairs: ", numOfPairs);
      createMemoryDeck(words, LEVELS[lvl] || 10);
    }

    function createMemoryDeck(words, numberOfPairs) {
      if (!words) {
        console.error('Words data is undefined');
        return;
      }
        // Select random unique indices from the words array
        const selectedIndices = getRandomIndexes(words.length, numberOfPairs);
        //console.log("selectedIndices: ", selectedIndices);
        // Split the selected word pairs into separate Spanish and Hebrew arrays
        const spanishWords = selectedIndices.map(index => ({ word: words[index].spanish, language: 'Spanish', pairIndex: index }));
        const hebrewWords = selectedIndices.map(index => ({ word: words[index].hebrew, language: 'Hebrew', pairIndex: index }));
      
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
        //console.log("The new deck: ", preparedDeck);
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

   

    



  
  
  return (
        <div className="memory-game-container"> {/* Add className for styling */}
           {gameEnd.end ? (
            // Compare matchCards to numOfPairs instead of numOfCards
            gameEnd.matchCards === numOfPairs ? (
              <div className="endGame">
                <h2>Win</h2>
              </div>
            ) : (
              <div className="endGame">
                <h2>Lose</h2>
              </div>
            )
            )
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
                card={card}
                deck={deck}
                setDeck={setDeck}
                setGameEnd={setGameEnd}
                flippedIndices={flippedIndices}
                setFlippedIndices={setFlippedIndices}
                isChecking={isChecking}
                setIsChecking={setIsChecking}
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
                        card={card}
                        deck={deck}
                        setDeck={setDeck}
                        setGameEnd={setGameEnd}
                        flippedIndices={flippedIndices}
                        setFlippedIndices={setFlippedIndices}
                        isChecking={isChecking}
                        setIsChecking={setIsChecking}
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
