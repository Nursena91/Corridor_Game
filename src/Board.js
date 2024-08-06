import React, { useState } from 'react';
import Square from './Square';
import Wall from './Wall';
import Space from './Space';
import './App.css';

const Board = () => {
  const [players, setPlayers] = useState({
    player1: { row: 0, col: 4 },
    player2: { row: 16, col: 4 }
  });

  const [currentPlayer, setCurrentPlayer] = useState('player2');
  const [highlightedSquares, setHighlightedSquares] = useState([]);
  const [hoveredWalls, setHoveredWalls] = useState([]);
  const [hoveredSpaces, setHoveredSpaces] = useState([]);
  const [clickedWalls, setClickedWalls] = useState([]);
  const [clickedSpaces, setClickedSpaces] = useState([]);

  const handlePlayerClick = (player) => {
    if (player === currentPlayer) {
      const { row, col } = players[player];
      const newHighlightedSquares = [
        { row: row - 2, col }, 
        { row: row + 2, col },
        { row, col: col - 1 },  
        { row, col: col + 1 }   
      ].filter(({ row, col }) => row >= 0 && row < 17 && col >= 0 && col < 9);

      setHighlightedSquares(newHighlightedSquares);
    }
  };

  const handleSquareClick = (rowIndex, colIndex) => {
    const highlighted = highlightedSquares.some(
      (square) => square.row === rowIndex && square.col === colIndex
    );

    if (highlighted) {
      setPlayers(prevPlayers => ({
        ...prevPlayers,
        [currentPlayer]: { row: rowIndex, col: colIndex }
      }));
      setCurrentPlayer(currentPlayer === 'player1' ? 'player2' : 'player1');
      setHighlightedSquares([]);
    }
  };

  const handleWallHover = (rowIndex, colIndex, orientation) => {
    if (rowIndex >= 16 || colIndex >= 8) {
      return;
    }

    let newHoveredWalls = [{ row: rowIndex, col: colIndex }];
    let newHoveredSpaces = [];

    if (orientation === 'vertical') {
      if (rowIndex < 16) {
        newHoveredWalls.push({ row: rowIndex + 2, col: colIndex });
        newHoveredSpaces.push({ row: rowIndex + 1, col: colIndex });
      }
    } else {
      if (colIndex < 8) {
        newHoveredWalls.push({ row: rowIndex, col: colIndex + 1 });
        newHoveredSpaces.push({ row: rowIndex, col: colIndex });
      }
    }

    newHoveredWalls = newHoveredWalls.filter(({ row, col }) => row >= 0 && row < 17 && col >= 0 && col < 9);
    newHoveredSpaces = newHoveredSpaces.filter(({ row, col }) => row >= 0 && row < 17 && col >= 0 && col < 9);

    setHoveredWalls(newHoveredWalls);
    setHoveredSpaces(newHoveredSpaces);
  };

  const handleWallHoverEnd = () => {
    setHoveredWalls([]);
    setHoveredSpaces([]);
  };

  const handleWallClick = (rowIndex, colIndex, orientation) => {
    if (rowIndex >= 16 || colIndex >= 8) {
      return;
    }
    let newClickedWalls = [{ row: rowIndex, col: colIndex }];
    let newClickedSpaces = [];

    if (orientation === 'vertical') {
      if (rowIndex < 16) {
        newClickedWalls.push({ row: rowIndex + 2, col: colIndex });
        newClickedSpaces.push({ row: rowIndex + 1, col: colIndex });
      }
    } else {
      if (colIndex < 8) {
        newClickedWalls.push({ row: rowIndex, col: colIndex + 1 });
        newClickedSpaces.push({ row: rowIndex, col: colIndex });
      }
    }

    newClickedWalls = newClickedWalls.filter(({ row, col }) => row >= 0 && row < 17 && col >= 0 && col < 9);
    newClickedSpaces = newClickedSpaces.filter(({ row, col }) => row >= 0 && row < 17 && col >= 0 && col < 9);

    setClickedWalls(prevClickedWalls => [
      ...prevClickedWalls,
      ...newClickedWalls
    ]);

    setClickedSpaces(prevClickedSpaces => [
      ...prevClickedSpaces,
      ...newClickedSpaces
    ]);
  };

  const renderRow = (rowIndex) => {
    const elements = [];
    for (let colIndex = 0; colIndex < 9; colIndex++) {
      const isHighlighted = highlightedSquares.some(
        (square) => square.row === rowIndex && square.col === colIndex
      );
      const isHoveredWall = hoveredWalls.some(
        (wall) => wall.row === rowIndex && wall.col === colIndex
      );
      const isHoveredSpace = hoveredSpaces.some(
        (space) => space.row === rowIndex && space.col === colIndex
      );
      const isClickedWall = clickedWalls.some(
        (wall) => wall.row === rowIndex && wall.col === colIndex
      );
      const isClickedSpace = clickedSpaces.some(
        (space) => space.row === rowIndex && space.col === colIndex
      );

      let player = null;
      if (rowIndex === players.player1.row && colIndex === players.player1.col) {
        player = 'player1';
      } else if (rowIndex === players.player2.row && colIndex === players.player2.col) {
        player = 'player2';
      }

      if (rowIndex % 2 === 0) {
        elements.push(
          <Square
            key={`square-${rowIndex}-${colIndex}`}
            id={`square-${rowIndex}-${colIndex}`}
            player={player}
            isHighlighted={isHighlighted}
            onClick={() => handleSquareClick(rowIndex, colIndex)}
            onPlayerClick={() => handlePlayerClick(player)}
          />
        );
        if (colIndex < 8) {
          elements.push(
            <Wall
              key={`v-wall-${rowIndex}-${colIndex}`}
              orientation="vertical"
              onHover={() => handleWallHover(rowIndex, colIndex, 'vertical')}
              onHoverEnd={handleWallHoverEnd}
              onClick={() => handleWallClick(rowIndex, colIndex, 'vertical')}
              isHovered={isHoveredWall}
              isClicked={isClickedWall}
            />
          );
        }
      } else {
        elements.push(
          <Wall
            key={`h-wall-${rowIndex}-${colIndex}`}
            orientation="horizontal"
            onHover={() => handleWallHover(rowIndex, colIndex, 'horizontal')}
            onHoverEnd={handleWallHoverEnd}
            onClick={() => handleWallClick(rowIndex, colIndex, 'horizontal')}
            isHovered={isHoveredWall}
            isClicked={isClickedWall}
          />
        );
        if (colIndex < 8) {
          elements.push(
            <Space
              key={`space-${rowIndex}-${colIndex}`}
              isHovered={isHoveredSpace || isClickedSpace}
            />
          );
        }
      }
    }

    return <div className="board-row" key={`row-${rowIndex}`}>{elements}</div>;
  };

  const rows = [];
  for (let i = 0; i < 17; i++) {
    rows.push(renderRow(i));
  }

  return (
    <div className="board">
      {rows}
    </div>
  );
}

export default Board;
