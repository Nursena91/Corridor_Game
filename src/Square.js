import React from 'react';

function Square({ player, isHighlighted, onClick, onPlayerClick }) {
    let className = "square";
    if (isHighlighted) {
        className += " highlighted";
    }

    return (
        <div className={className} onClick={onClick}>
            {player === 'player1' && <div className="player player1" onClick={(e) => { e.stopPropagation(); onPlayerClick(); }}></div>}
            {player === 'player2' && <div className="player player2" onClick={(e) => { e.stopPropagation(); onPlayerClick(); }}></div>}
        </div>
    );
}

export default Square;
