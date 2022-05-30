import { Box, Heading, VStack } from "@chakra-ui/react";

const QuestionResult = ({ correct_answer, loadNextQuestion, questionsLeft, result }) => {
  return (
    <div className="QuestionResult">
      <VStack>
        <Box>
          <Heading as="h3" fontSize="xl" textAlign="center">
            {result}
          </Heading>
        </Box>
        {result === "INCORRECT" && (
          <Box>
            <p>
              Correct answer:{" "}
              <span dangerouslySetInnerHTML={{ __html: correct_answer }} />
            </p>
          </Box>
        )}
      </VStack>
    </div>
  );
};

export default QuestionResult;
