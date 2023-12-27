import React from "react";
import { useNavigate } from 'react-router-dom';
import wordDate from "../../public/"

function GameOption(props) {
  const navigate = useNavigate();

  
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

  const levels = ['Easy', 'Medium', 'Hard'];
  const categories = ['Animals', 'Colors', 'Fruits'];


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
          props.setContent({ level: "", category: "" });
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
