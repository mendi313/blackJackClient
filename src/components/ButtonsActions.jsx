import React from 'react';

export default function ButtonsActions({ hit, stay, playAgain, playerCanHit }) {
  return (
    <div>
      <button className="button" onClick={hit}>
        Hit
      </button>
      <button className="button" onClick={stay}>
        Stay
      </button>
      <br />
      {!playerCanHit && (
        <button className="button" onClick={playAgain}>
          Play Again
        </button>
      )}
    </div>
  );
}
