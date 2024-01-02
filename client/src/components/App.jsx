import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";
import ChooseGame from "../games/chooseGame";
import GameOption from "../games/gameOption";
import MemoryGame from "../games/MemoryGame/MemoryGame";
import wordDate from "../data/wordsData";
import axios from 'axios';

function App() {
  const [gameNames, setGameNames] = useState(["Memory Card"]);

  const [content, setContent] = useState({
    level: "Easy",
    category: Object.keys(wordDate)[0]
  });

  


  // Optional for later, the user can open new games we he level up
  function addGameNames(gameName){
    setGameNames( prevGameNames => [...prevGameNames, gameName])
  }

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ChooseGame gameNames={gameNames} />} />
        <Route path="/memory-card/game-option/" element={<GameOption content={content} setContent={setContent} wordsDict={wordDate}/>} />
        <Route path="/memory-card-game" element={<MemoryGame content={content} setContent={setContent} wordsDict={wordDate}/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
