import { Button, VStack } from "@chakra-ui/react";

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
      <VStack spacing={4}>
        <Button
          colorScheme="teal"
          onClick={handleHowToPlay}
          width="100%"
          variant="outline"
        >
          How to Play
        </Button>
        <Button colorScheme="teal" onClick={handleStart} width="100%">
          Start
        </Button>
      </VStack>
    </div>
  );
};

export default Start;
