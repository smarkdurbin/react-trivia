import {
  Box,
  Button,
  Center,
  Container,
  Progress,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";

const Header = ({ answerTimer, showHowToPlay, timeToAnswer }) => {
  return (
    <header className="Header">
      <Box backgroundColor="teal" className="Navbar" py={3}>
        <Container maxWidth={"container.xl"}>
          <SimpleGrid columns={3} spacing={3}>
            <Box alignSelf="center" textAlign="left" verticalAlign={true}>
              <Text as="strong" color="white" fontSize="xl">
                React Trivia
              </Text>
            </Box>
            <Center>
              <Text as="strong" color="white" fontSize="lg" ml="auto" mr="auto">
                {timeToAnswer && `:${timeToAnswer}`}
              </Text>
            </Center>
            <Box textAlign="right">
              <Button
                colorScheme="white"
                mr="0"
                onClick={showHowToPlay}
                variant="outline"
              >
                ?
              </Button>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>
      {answerTimer && (
        <Progress colorScheme="teal" value={100 - (timeToAnswer / 30) * 100} />
      )}
    </header>
  );
};

export default Header;
