import React, { useState } from "react";

function ChooseLevel() {
  const [levelAndCategory, setLevelAndCategory] = useState({
    level: "",
    category: ""
  });

  const levels = ['Easy', 'Medium', 'Hard'];
  const categories = ['Animals', 'Colors', 'Fruits'];

  function handleChange(event) {
    const { name, value } = event.target;
    setLevelAndCategory(prevValue => ({
      ...prevValue,
      [name]: value
    }));
  }

  return (
    <div className="choose-level-container"> {/* Applied container class for styling */}
      <form className="choose-level-form"> {/* This matches the form class in your CSS */}
        <label className="choose-level-label"> {/* Label class if needed */}
          Choose a level:
          <select
            className="choose-level-select" // Applied select class for styling
            name="level" 
            value={levelAndCategory.level}
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
            value={levelAndCategory.category}
            onChange={handleChange}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>           
      </form>
    </div>
  );
}

export default ChooseLevel;
