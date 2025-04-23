import React, { useState } from 'react';
import './Selection.css';

const iconMap = {
  F: <span role="img" aria-label="fuelling">⛽</span>,
  S: <span role="img" aria-label="servicing">🔧</span>,
  C: <span role="img" aria-label="cleaning">🧽</span>,
};

const Selection = ({ type = 'F', initialState = 'required' }) => {
  const [moodletState, setMoodletState] = useState(initialState);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleRightClick = (event) => {
    event.preventDefault();
    if (moodletState === 'required') {
      setMoodletState('not required');
    } else if (moodletState === 'not required' || moodletState === 'completed')  {
      setMoodletState('required');
    }
  };

  const handleLeftClick = () => {
    if (moodletState === 'required') {
      setMoodletState('current');
    } else if (moodletState === 'current') {
      setMoodletState('completed');
    } else if (moodletState === 'completed') {
      setMoodletState('current');
    }
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div
      className={`moodlet moodlet-${moodletState}`}
      onClick={handleLeftClick}
      onContextMenu={handleRightClick}
    >
      <div className="moodlet-icon">
        {iconMap[type]}
      </div>
      <div className="moodlet-letter">{type}</div><br></br>
      <p className="moodlet-state">{moodletState}</p>

      {/* Dropdown */}
      <div className="dropdown">
        <button className="dropdown-toggle" onClick={toggleDropdown}>
          <span>Options</span> <span className="arrow">↓</span>
        </button>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-item">{iconMap[type]} Option 1</div>
            <div className="dropdown-item">{iconMap[type]} Option 2</div>
            <div className="dropdown-item">{iconMap[type]} Option 3</div>
          </div>
        )}
      </div>
    </div>
  );
};

const Dropdown = () => {
  return (
    <div className="dropdown-container">
      <h3>Select</h3>
      <div className="moodlet-group">
        <Selection type="F" />
        <Selection type="S" />
        <Selection type="C" />
      </div>
    </div>
  );
};

export default Dropdown;
