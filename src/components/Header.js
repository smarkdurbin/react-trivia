import {
  Box,
  Container,
  Flex,
  Heading,
  Progress,
  Text,
} from "@chakra-ui/react";

const Header = ({ answerTimer, questionTimeLimit, timeToAnswer }) => {
  return (
    <header className="Header">
      <Box backgroundColor="teal" className="Navbar" py={3}>
        <Container maxWidth={"container.xl"}>
          <Flex>
            <Box width="40%" textAlign="left">
              <Heading as="h1" color="white" fontSize="xl">
                React Trivia
              </Heading>
            </Box>
            <Box alignSelf="center" width="20%"></Box>
            <Box alignSelf="center" textAlign="right" width="40%">
              <Text as="strong" color="white" fontSize="md" ml="auto" mr="auto">
                {timeToAnswer >= 0
                  ? `:${String(Math.floor(timeToAnswer / 100)).padStart(
                      2,
                      "0"
                    )}`
                  : ""}
              </Text>
            </Box>
          </Flex>
        </Container>
      </Box>
      {answerTimer && (
        <Progress
          colorScheme="yellow"
          value={100 - (timeToAnswer / questionTimeLimit) * 1000}
        />
      )}
    </header>
  );
};

export default Header;
