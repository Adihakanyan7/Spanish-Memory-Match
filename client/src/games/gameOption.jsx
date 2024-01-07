import React, { useState, useEffect, useContext  } from 'react';
import {  useNavigate  } from 'react-router-dom';
import '../styles/GameOption.css';
import { useDeckContext,DeckContext } from "./context.ts"



const levels = ['Easy', 'Medium', 'Hard'];


function GameOption(props) {
  const navigate = useNavigate();
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [categories, setCategories] = useState([]);
  const { words,setWords, content, setContent } = useDeckContext(DeckContext);

  useEffect(() => {
    //console.log("GameOption -> useEffect with shouldNavigate ->  before -> Words set in context:", words);
    if (shouldNavigate && words.length > 0) {
      //console.log("GameOption -> handlePlay -> after -> Words set in context:", words);
      navigate("/memory-card-game/board");
      setShouldNavigate(false); // Reset the flag
    }
  }, [words, shouldNavigate, navigate]);

  useEffect(() => {
    // Fetch data when component mounts
    fetch("http://localhost:3001/categories") // Replace with your server's URL and endpoint
      .then(response => response.json())
      .then(data => {
        setCategories(data); // Update state with fetched data
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []); // Empty dependency array means this runs once when component mounts




  function handleChange(event) {
    const { name, value } = event.target;

    setContent( (prevValue) =>{
      return {
        ...prevValue,
        [name]: value
      }
    })
  }



  function handlePlay() {
    // Fetch words for the selected category from the server
    fetch(`http://localhost:3001/words/${content.category}`)
    .then(response => response.json())
    .then(data => {
      //console.log("GameOption -> handlePlay -> Words fetched:", data);
      setWords(data); // Use setWords from the context to update the words
      setShouldNavigate(true); // Set flag to indicate words have been set
    })
    .catch(error => {
      console.error('Error fetching words:', error);
    });
  };

  return (
    <div className="choose-level-container"> 
      <form className="choose-level-form"> 
        <label className="choose-level-label">
          Choose a level:
          <select
            className="choose-level-select" // Applied select class for styling
            name="level" 
            value={content.level}
            onChange={handleChange}
          >
            {levels.map(level => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </label>
        <label className="choose-level-label"> {/* Label class if needed */}
          Choose a category:
          <select
            className="choose-level-select" // Applied select class for styling
            name="category"
            value={content.category}
            onChange={handleChange}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>    


        <button onClick={(event)=>{
          event.preventDefault();
          handlePlay();   
          }}>
            Play
        </button>

        <button onClick={(event)=>{
          event.preventDefault();
          navigate("/");
          }}>
            Back
        </button>

      </form>
    </div>
  );
}

export default GameOption;
