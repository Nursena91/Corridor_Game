import React from 'react';

function Square({ player, isHighlighted, onClick, hWall, vWall }) {
    let className = "square";
    if (isHighlighted) {
        className += " highlighted";
    }

    return (
        <div className={className} onClick={onClick}>
            {player === 'player1' && <div className="player player1"></div>}
            {player === 'player2' && <div className="player player2"></div>}
            {vWall && <div className="wall wall-vertical"></div>}
            {hWall && <div className="wall wall-horizontal"></div>}
        </div>
    );
}

export default Square;
