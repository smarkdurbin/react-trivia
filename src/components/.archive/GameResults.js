import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const GameResults = ({ questionsRight, questionsWrong, startGame }) => {
  // State.
  const [right, setRight] = useState();
  const [wrong, setWrong] = useState();

  // Hook on questions right.
  useEffect(() => {
    // Set right.
    setRight(questionsRight);
  }, [questionsRight]);

  // Hook on questions wrong.
  useEffect(() => {
    // Set wrong.
    setWrong(questionsWrong);
  }, [questionsWrong]);

  return (
    <div className="GameResults">
      <Text fontSize="lg" as="p" mb={8}>
        You answered <strong>{right}</strong> questions correctly and{" "}
        <strong>{wrong}</strong> incorrectly.
      </Text>
    </div>
  );
};

export default GameResults;
