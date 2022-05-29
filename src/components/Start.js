const Start = ({ showHowToPlay, startGame }) => {
  const handleHowToPlay = () => {
    // Show how to play.
    showHowToPlay();
  };

  const handleStart = () => {
    // Start game.
    startGame();
  };
  return (
    <div className="Start">
      <button onClick={handleHowToPlay}>How to Play</button>
      <button onClick={handleStart}>Start</button>
    </div>
  );
};

export default Start;
