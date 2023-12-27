import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";
import OpeningGame from "../games/openingGame";
import MemoryGame from "../games/optionGame/MemoryGame/openMemoryGame";
import MatchGame from "../games/optionGame/MatchGame/openMatchGame";

function App() {
  const [gameNames, setGameNames] = useState(["Memory Card", "Matching"]);

  // Optional for later, the user can open new games we he level up
  function addGameNames(gameName){
    setGameNames( prevGameNames => [...prevGameNames, gameName])
  }

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<OpeningGame gameNames={gameNames} />} />
        <Route path="/game/memory-card" element={<MemoryGame />} />
        <Route path="/game/matching" element={<MatchGame />} />
        {/* Define routes for other games */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
