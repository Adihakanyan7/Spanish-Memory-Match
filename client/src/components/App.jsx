import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";
import ChooseGame from "../games/ChooseGame.jsx";
import GameOption from "../games/GameOption.jsx";
import Board from "../games/MemoryGame/Board.jsx";
import Deck from "../games/MemoryGame/Deck.jsx";
import { DeckContext, useDeckContext} from "../games/context.ts";


const LEVELS = {
  'Easy' : 5,
  "Medium" : 10,
  "Hard" : 15
}
const initialNumOfPairsValue = LEVELS['Easy'];

function App() {
  const [gameNames] = useState(["Memory Card"]);
  const [deck, setDeck] = useState([]);
  const [words, setWords] = useState([]);
  const [numOfPairs, setNumOfPairs] = useState(initialNumOfPairsValue); // Define the initial value appropriately
  const [content, setContent] = useState({
    level: "Easy",
    category: "Colors"
  });
  // Include words and setWords in the context provider value

  const contextValue = {
    deck: deck,
    setDeck: setDeck,
    words: words,
    setWords: setWords,
    initialNumOfPairsValue :LEVELS['Easy'],
    numOfPairs: numOfPairs,
    setNumOfPairs: setNumOfPairs,
    content: content,
    setContent: setContent
  };

  


  return (
    <DeckContext.Provider value={contextValue}>
      <Router>
        <Header />
        <Routes>
          <Route path="/games" element={<ChooseGame gameNames={gameNames} />} />
          <Route path="/memory-card/game-option/" element={<GameOption/>} />
          <Route path="/memory-card-game/board" element={<Board />} />
        </Routes>
        <Footer />
      </Router>
    </DeckContext.Provider>
  );
}

export default App;
