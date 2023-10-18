import React, { useState } from 'react';
import "./App.css";

export default function App() {
  const [players, setPlayers] = useState([
    { name: 'Иван', score: 0 },
    { name: 'Мария', score: 0 },
    { name: 'Павел', score: 0 }
  ]);

  function increaseScore(name) {
    const newPlayers = players.map(player =>
      player.name == name ? { ...player, score: player.score + 1 } : player);
    setPlayers(newPlayers);
  }

  function decreaseScore(name) {
    const newPlayers = players.map(player =>
      player.name == name ? { ...player, score: player.score - 1 } : player);
    setPlayers(newPlayers);
  }

  const totalScore = players.reduce((acc, player) => acc + player.score, 0);

  function renderTr() {
    return players.map(player =>
      <tr>
        <td>{player.name}</td>
        <td>{player.score}</td>
        <td>
          <button style={{ background: '#21813e' }}
            onClick={() => increaseScore(player.name)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
          </button>
          <button style={{ background: 'red' }}
            onClick={() => decreaseScore(player.name)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
              <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
            </svg>
          </button>
        </td>
      </tr>
    )
  }

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <td>Име</td>
            <td>Резултат</td>
            <td>Действия</td>
          </tr>
        </thead>
        <tbody>
          {renderTr()}
        </tbody>
      </table>
      <div className='total'>
        <h3>Общ резултат: {totalScore}</h3>
      </div>
    </div>
  );
}
