import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";
import ChooseGame from "../games/chooseGame";
import GameOption from "../games/gameOption";


function App() {
  const [gameNames, setGameNames] = useState(["Memory Card"]);

  const [content, setContent] = useState({
    level: "",
    category: ""
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
        <Route path="/memory-card/game-option/" element={<GameOption content={content} setContent={setContent}/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
