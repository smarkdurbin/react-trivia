import { useEffect, useState } from "react";
import { shuffleArray } from "../helpers/helpers";
import { Box, Button, Text, VStack } from "@chakra-ui/react";

const Question = ({
  answerQuestion,
  category,
  correct_answer,
  difficulty,
  incorrect_answers,
  loadNextQuestion,
  timeToAnswer,
  question,
  questionsLeft,
  result,
  type,
}) => {
  // State.
  const [possibleAnswers, setPossibleAnswers] = useState([]);

  // Handler answer.
  const handleAnswer = (answer) => {
    // Answer question.
    answerQuestion(answer);
  };

  // Hook on component mount.
  useEffect(() => {
    // If incorrect answers is not an array.
    if (!Array.isArray(incorrect_answers)) {
      // Define incorrect answers.
      incorrect_answers = [incorrect_answers];
    }

    // Answers.
    const answers = shuffleArray([correct_answer, ...incorrect_answers]);

    // Set possible answers.
    setPossibleAnswers(answers);
  }, [correct_answer, incorrect_answers]);

  return (
    <div className="Question">
      <VStack spacing={8}>
        <Box>
          <VStack spacing={4}>
            <Box>
              <Text color="gray">
                <em>
                  {category}, {difficulty} difficulty
                </em>
              </Text>
            </Box>
            <Box>
              <Text fontSize="xl">
                <strong dangerouslySetInnerHTML={{ __html: question }} />
              </Text>
            </Box>
            <Box></Box>
          </VStack>
        </Box>
        <Box w="100%">
          <VStack spacing={3}>
            {possibleAnswers.map((answer, idx) => (
              <Button
                colorScheme="gray"
                disabled={timeToAnswer === 0 || result}
                key={idx}
                onClick={() => handleAnswer(answer)}
                variant="outline"
                width="100%"
              >
                <span dangerouslySetInnerHTML={{ __html: answer }} />
              </Button>
            ))}
            {result && questionsLeft > 0 && (
              <Button
                colorScheme="teal"
                onClick={loadNextQuestion}
                width="100%"
              >
                Next Question
              </Button>
            )}
          </VStack>
        </Box>
      </VStack>
    </div>
  );
};

export default Question;
