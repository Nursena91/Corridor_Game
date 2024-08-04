import React from 'react';

function Wall({ player, isHighlighted, onClick }) {
    let className = "wall";
    if (isHighlighted) {
        className += " highlighted";
    }

    return (
        <div className={className} onClick={onClick}>
            {player === 'player1' && <div className="player player1"></div>}
            {player === 'player2' && <div className="player player2"></div>}
        </div>
    );
}

export default Wall;