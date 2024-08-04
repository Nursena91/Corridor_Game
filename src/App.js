import React, { useState } from 'react';
import Board from './Board';
import './App.css';

function App() {
    const [board, setBoard] = useState(createInitialBoard());
    const [currentPlayer, setCurrentPlayer] = useState('player2');
    const [selectedPiece, setSelectedPiece] = useState(null);
    const [highlightedSquares, setHighlightedSquares] = useState([]);

    function createInitialBoard() {
        const squares = [];
        for (let row = 0; row < 9; row++) {
            const rowSquares = [];
            const horizontalwalls = [];
            horizontalwalls.push(null);
            for (let col = 0; col < 9; col++) {
                const verticalwalls =[];
                verticalwalls.push(null);
                if (row === 0 && col === 4) {
                    rowSquares.push('player1');
                } else if (row === 8 && col === 4) {
                    rowSquares.push('player2');
                } else {
                    rowSquares.push(null);
                }
            }
            squares.push(rowSquares);
        }
        return squares;
    }


    return (
        <div className="App">
            <Board
                board={board}
                currentPlayer={currentPlayer}
                selectedPiece={selectedPiece}
                setSelectedPiece={setSelectedPiece}
                highlightedSquares={highlightedSquares}
                setHighlightedSquares={setHighlightedSquares}
                setCurrentPlayer={setCurrentPlayer}
                setBoard={setBoard}
            />
        </div>
    );
}

export default App;
