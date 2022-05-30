import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";

const Start = ({ start }) => {
  return (
    <div className="Start">
      <VStack spacing={8}>
        <Box width="100%">
          <Heading as="h2">Welcome to React Trivia</Heading>
        </Box>
        <Box width="100%">
          <Text>
            Each round is (20) questions. You have 30 seconds to answer each question. Press <strong>Start</strong> to begin playing.
          </Text>
        </Box>
        <Box width="100%">
          <Button colorScheme="teal" onClick={start} width="100%">
            Start
          </Button>
        </Box>
      </VStack>
    </div>
  );
};

export default Start;
