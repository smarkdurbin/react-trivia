import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { shuffleArray } from "../helpers/helpers";

const CurrentQuestion = ({
  answer,
  question,
  correct_answer,
  gameEnded,
  incorrect_answers,
  isLast,
  loadNext,
  result,
  showResults,
  type,
}) => {
  // State.
  const [possibleAnswers, setPossibleAnswers] = useState([]);

  // Hook on correct answers, incorrect answers.
  useEffect(() => {
    // If not incorrect answers is array.
    if (!Array.isArray) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      incorrect_answers = [incorrect_answers];
    }

    // If type is boolean.
    if (type === "boolean") {
      // Set possible answers.
      setPossibleAnswers(["True","False"]);
    } else {
      // Set possible answers.
      setPossibleAnswers(shuffleArray([correct_answer, ...incorrect_answers]));
    }
  }, [correct_answer, incorrect_answers]);

  return (
    <div className="CurrentQuestion">
      <VStack spacing={8}>
        <Box width="100%">
          <Heading
            as="h2"
            dangerouslySetInnerHTML={{ __html: question }}
            fontSize="2xl"
          />
        </Box>
        {result && (
          <Box width="100%">
            {result === "CORRECT" && (
              <Alert status="success">
                <AlertIcon />
                Correct!
              </Alert>
            )}
            {result === "EXPIRED" && (
              <Alert status="error">
                <AlertIcon />
                Time has expired for this question.
              </Alert>
            )}
            {result === "INCORRECT" && (
              <Alert status="error">
                <AlertIcon />
                Incorrect
              </Alert>
            )}
          </Box>
        )}
        <Box width="100%">
          <VStack spacing={4}>
            {possibleAnswers.map((possibleAnswer, idx) => (
              <AnswerButton
                action={answer}
                actionValue={possibleAnswer}
                isCorrect={possibleAnswer === correct_answer}
                key={idx}
                result={result}
                text={possibleAnswer}
              />
            ))}
          </VStack>
        </Box>
        {!gameEnded && (
          <Box width="100%">
            <HStack spacing={8}>
              <Box ml="auto">
                {result && !isLast && <NextButton action={loadNext} />}
              </Box>
            </HStack>
          </Box>
        )}
        {result && isLast && (
          <Box width="100%">
            <ResultsButton action={showResults} />
          </Box>
        )}
      </VStack>
    </div>
  );
};

const AnswerButton = ({ action, isCorrect, result, text, actionValue }) => {
  // State.
  const [colorScheme, setColorScheme] = useState("gray");
  const [isSelected, setIsSelected] = useState(false);

  // Handle click.
  const handleClick = () => {
    // If result, return.
    if (result) return;

    // Execute action.
    action(actionValue);

    // Set is selected.
    setIsSelected(true);
  };

  // Hook on result.
  useEffect(() => {
    // If not result.
    if (!result) {
      // Set color scheme.
      setColorScheme("gray");

      // Set is selected.
      setIsSelected(false);

      return;
    }

    // If is correct.
    if (isCorrect) {
      // Set color scheme.
      setColorScheme("green");
    } else {
      // If is selected.
      if (isSelected) {
        // Set color scheme.
        setColorScheme("red");
      }
    }
  }, [result, isCorrect, isSelected]);

  return (
    <Button
      colorScheme={colorScheme}
      isDisabled={result}
      onClick={handleClick}
      width="100%"
    >
      <span dangerouslySetInnerHTML={{ __html: text }} />
    </Button>
  );
};

const NextButton = ({ action }) => {
  return (
    <Button colorScheme="teal" onClick={action}>
      Next
    </Button>
  );
};

const ResultsButton = ({ action }) => {
  return (
    <Button colorScheme="teal" onClick={action} width="100%">
      Results
    </Button>
  );
};

const SkipButton = ({ action }) => {
  return (
    <Button colorScheme="gray" onClick={action}>
      Skip
    </Button>
  );
};

export default CurrentQuestion;
