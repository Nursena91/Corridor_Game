import React from 'react';
import Square from './Square';
import Wall from './Wall';

function Board({
    board,
    currentPlayer,
    selectedPiece,
    setSelectedPiece,
    highlightedSquares,
    setHighlightedSquares,
    setBoard,
    setCurrentPlayer,
}) {
    const handleSquareClick = (row, col) => {
        if (selectedPiece) {
            if (highlightedSquares.some(([r, c]) => r === row && c === col)) {
                const newBoard = board.map((r, rowIndex) => r.map((square, colIndex) => {
                    if (rowIndex === selectedPiece.row && colIndex === selectedPiece.col) {
                        return null; // highlight sönecek
                    } else if (rowIndex === row && colIndex === col) {
                        return currentPlayer;
                    }
                    return square;
                }));
                setBoard(newBoard);
                setCurrentPlayer(currentPlayer === 'player2' ? 'player1' : 'player2');
                setSelectedPiece(null);
                setHighlightedSquares([]);
            }
        } else {
            if (board[row][col] === currentPlayer) {
                setSelectedPiece({ row, col });
                setHighlightedSquares(getValidMoves(row, col, board));
            }
        }
    };

    const getValidMoves = (row, col, board) => {
        const moves = [];
        // Bu kısım silinip duvar kısmına uygun yazılacak
        if (row > 0 && !board[row - 1][col]) moves.push([row - 1, col]);
        if (row < 8 && !board[row + 1][col]) moves.push([row + 1, col]);
        if (col > 0 && !board[row][col - 1]) moves.push([row, col - 1]);
        if (col < 8 && !board[row][col + 1]) moves.push([row, col + 1]);
        return moves;
    };

    return (
        <div>
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="board-row">
                    {row.map((square, colIndex) => (
                        <Square
                            key={colIndex}
                            player={square}
                            isHighlighted={highlightedSquares.some(([r, c]) => r === rowIndex && c === colIndex)}
                            onClick={() => handleSquareClick(rowIndex, colIndex)}
                            vWall={colIndex > 0}
                            hWall={rowIndex > 0}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Board;
