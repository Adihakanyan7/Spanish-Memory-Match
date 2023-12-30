import { useNavigate,  } from 'react-router-dom';
import '../styles/ChooseLevel.css';

const levels = ['Easy', 'Medium', 'Hard'];


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

  const categories = Object.keys(props.wordsDict);


  function handlePlay() {
    const selectedCategoryWords = props.wordsDict[props.content.category]

    // Navigates to the game page and passes the level, category, and words
    navigate("/memory-card-game");
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
