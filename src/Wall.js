import React from 'react';
import './App.css';

const Wall = ({ orientation, isHovered, isClicked, onHover, onHoverEnd, onClick }) => {
  const wallClass = `wall ${orientation} ${isHovered ? 'hovered' : ''} ${isClicked ? 'clicked' : ''}`;

  return (
    <div
      className={wallClass}
      onMouseEnter={onHover}
      onMouseLeave={onHoverEnd}
      onClick={onClick}
    />
  );
}

export default Wall;
