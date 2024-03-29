import { useState } from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Login from "../user/login/login.jsx";
import Register from "../user/registration/register.jsx";
import ChooseGame from "../games/ChooseGame.jsx";
import GameOption from "../games/gameOption.jsx";
import Board from "../games/MemoryGame/Board.jsx";
import { DeckContext } from "../games/context.ts";
import { UserContext} from "./userContext.ts"
import PrivateRoute from "./PrivateRoute.jsx";

const LEVELS = {
  Easy: 5,
  Medium: 10,
  Hard: 15,
};
const initialNumOfPairsValue = LEVELS["Easy"];

function App() {
  const [gameNames] = useState(["Memory Card"]);
  const [deck, setDeck] = useState([]);
  const [words, setWords] = useState([]);
  const [numOfPairs, setNumOfPairs] = useState(initialNumOfPairsValue); // Define the initial value appropriately
  const [content, setContent] = useState({
    level: "Easy",
    category: "Colors",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  
  
  const User = {
    isLoggedIn : isLoggedIn,
    setIsLoggedIn: setIsLoggedIn,
  }



// Include words and setWords in the context provider value
  const contextValue = {
    deck: deck,
    setDeck: setDeck,
    words: words,
    setWords: setWords,
    initialNumOfPairsValue: LEVELS["Easy"],
    numOfPairs: numOfPairs,
    setNumOfPairs: setNumOfPairs,
    content: content,
    setContent: setContent,
  };

  return (
    <Router>
      <DeckContext.Provider value={contextValue}>
        <UserContext.Provider value={User}>
          <Header/>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/games" element={<PrivateRoute><ChooseGame gameNames={gameNames} /></PrivateRoute>} />
            <Route path="/memory-card/game-option/" element={<PrivateRoute><GameOption /></PrivateRoute>} />
            <Route path="/memory-card-game/board" element={<PrivateRoute><Board /></PrivateRoute>} />
          </Routes>
          <Footer />
        </UserContext.Provider>
      </DeckContext.Provider>
    </Router>
  );
}

export default App;
