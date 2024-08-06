import React from 'react';
import './App.css';

const Space = ({ isHovered }) => {
  return (
    <div className={`space ${isHovered ? 'hovered' : ''}`}></div>
  );
}

export default Space;
