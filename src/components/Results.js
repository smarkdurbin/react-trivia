import { Box, Button, VStack } from "@chakra-ui/react";

const Results = ({ correctAnswers, incorrectAnswers, startGame }) => {
  return (
    <div className="Results">
      <VStack spacing={8}>
        <Box width="100%">
          {correctAnswers}/{correctAnswers + incorrectAnswers} correct.
        </Box>
        <Box width="100%">
          <Button colorScheme="teal" onClick={startGame} width="100%">
            Play Again
          </Button>
        </Box>
      </VStack>
    </div>
  );
};

export default Results;
