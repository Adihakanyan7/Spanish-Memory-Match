import {  useNavigate  } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import '../styles/ChooseLevel.css';
import axios from 'axios';

const levels = ['Easy', 'Medium', 'Hard'];


function GameOption(props) {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    // Fetch categories when the component mounts
    axios.get('http://localhost:3001/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);


  function handleChange(event) {
    const { name, value } = event.target;
    
    console.log("Updating:", name, value);

    props.setContent( (prevValue) =>{
      return {
        ...prevValue,
        [name]: value
      }
    })
  }

  //const categories = Object.keys(props.wordsDict);


  function handlePlay() {
    // Fetch words for the selected category from the server
    axios.get(`http://localhost:3001/words/${props.content.category}`)
      .then(response => {
        // Pass the words to the game page (you might need to adjust this)
        console.log("gameMemory- > \n " + "navigate(/memory-card-game, { state: { words: response.data } });", response.data)
        navigate("/memory-card-game", { state: { words: response.data } });
      })
      .catch(error => {
        console.error('Error fetching words:', error);
      });
  }


  return (
    <div className="choose-level-container"> {/* Applied container class for styling */}
      <form className="choose-level-form"> {/* This matches the form class in your CSS */}
        <label className="choose-level-label"> {/* Label class if needed */}
          Choose a level:
          <select
            className="choose-level-select" // Applied select class for styling
            name="level" 
            value={props.content.level}
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
            value={props.content.category}
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
          // props.onPlay(props.content.level, props.content.category);
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
