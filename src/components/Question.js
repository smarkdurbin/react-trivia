import { useEffect, useState } from "react";
import { shuffleArray } from "../helpers/helpers";

const Question = ({
  answerQuestion,
  category,
  correct_answer,
  difficult,
  incorrect_answers,
  timeToAnswer,
  question,
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
    // Answers.
    const answers = shuffleArray([correct_answer, ...incorrect_answers]);

    // Set possible answers.
    setPossibleAnswers(answers);
  }, [correct_answer, incorrect_answers]);

  return (
    <div className="Question">
      <h3>{question}</h3>
      {possibleAnswers.map((answer, idx) => (
        <button
          disabled={timeToAnswer === 0}
          key={idx}
          onClick={() => handleAnswer(answer)}
        >
          {answer}
        </button>
      ))}
    </div>
  );
};

export default Question;
