import { Container } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { getQuestions } from "../api/api";
import { intervalTimer } from "../helpers/helpers";
import CurrentQuestion from "./CurrentQuestion";
import Header from "./Header";
import Results from "./Results";
import Start from "./Start";

const Game = () => {
  // Questions per round.
  const questionsPerRound = 20;

  // Question time limit (milliseconds).
  const questionTimeLimit = 30000;

  // State.
  const [answerTimer, setAnswerTimer] = useState();
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState();
  const [currentQuestionResult, setCurrentQuestionResult] = useState();
  const [ended, setEnded] = useState();
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [isLastQuestion, setIsLastQuestion] = useState();
  const [questionCount, setQuestionCount] = useState(0);
  const [started, setStarted] = useState(false);
  const [timeToAnswer, setTimeToAnswer] = useState();

  // Answer current question.
  const answerCurrentQuestion = (answer) => {
    // If answer EQ current question correct answer.
    if (answer === currentQuestion.correct_answer) {
      // Set current question result.
      setCurrentQuestionResult("CORRECT");
    } else {
      // Set current question result.
      setCurrentQuestionResult("INCORRECT");
    }

    // End timer.
    endTimer();
  };

  // End game.
  const endGame = () => {
    // End timer.
    endTimer();

    // Set answer timer.
    setAnswerTimer();

    // Set question count.
    setQuestionCount(0);

    // Set ended.
    setEnded(true);
  };

  // End timer.
  const endTimer = useCallback(() => {
    // Clear interval.
    clearInterval(answerTimer);

    // Set time to answer.
    setTimeToAnswer();
  }, [answerTimer]);

  // Load question.
  const loadNextQuestion = async () => {
    // Get question.
    await getQuestions(1).then((questions) => {
      // Set current question.
      setCurrentQuestion(questions[0]);

      // Set current question result.
      setCurrentQuestionResult();

      // Set question count.
      setQuestionCount(questionCount + 1);

      // End timer.
      endTimer();

      // Start timer.
      startTimer();
    });
  };

  // Show results.
  const showResults = () => {
    // End game.
    endGame();
  };

  // Start game.
  const start = async () => {
    // Set question count.
    setQuestionCount(0);

    // Set is last question.
    setIsLastQuestion(false);

    // Load next question.
    await loadNextQuestion();

    // Set correct answers.
    setCorrectAnswers(0);

    // Set incorrect answers.
    setIncorrectAnswers(0);

    // Set game ended.
    setEnded(false);

    // Set game started.
    setStarted(true);
  };

  // Start timer.
  const startTimer = () => {
    // Create new interval timer.
    const newIntervalTimer = intervalTimer(questionTimeLimit, 10, (i) =>
      setTimeToAnswer(i)
    );

    // Set answer timer.
    setAnswerTimer(newIntervalTimer);
  };

  // Hook on current question result.
  useEffect(() => {
    // Switch on current question result.
    switch (currentQuestionResult) {
      case "CORRECT":
        // Set correct answers.
        setCorrectAnswers(correctAnswers + 1);
        break;
      case "EXPIRED":
        // Set incorrect answers.
        setIncorrectAnswers(incorrectAnswers + 1);
        break;
      case "INCORRECT":
        // Set incorrect answers.
        setIncorrectAnswers(incorrectAnswers + 1);
        break;
      default:
        break;
    }
  }, [currentQuestionResult]);

  // Hook on question count.
  useEffect(() => {
    // If question count GEQ questions per round.
    if (questionCount >= questionsPerRound) {
      // Set is last question.
      setIsLastQuestion(true);
    }
  }, [questionCount]);

  // Hook on time to answer.
  useEffect(() => {
    // If time expired.
    if (timeToAnswer === 0) {
      // Set current question result.
      setCurrentQuestionResult("EXPIRED");

      // Set questions wrong.
      setIncorrectAnswers(incorrectAnswers + 1);
    }
  }, [timeToAnswer]);

  return (
    <div className="Game">
      <Header
        answerTimer={answerTimer}
        questionTimeLimit={questionTimeLimit}
        timeToAnswer={timeToAnswer}
      />
      <Container maxWidth="lg" py="8">
        {ended && (
          <Results
            correctAnswers={correctAnswers}
            incorrectAnswers={incorrectAnswers}
            startGame={start}
          />
        )}
        {!started && <Start start={start} />}
        {started && currentQuestion && !ended && (
          <CurrentQuestion
            {...currentQuestion}
            answer={answerCurrentQuestion}
            gameEnded={ended}
            isLast={isLastQuestion}
            loadNext={loadNextQuestion}
            result={currentQuestionResult}
            showResults={showResults}
          />
        )}
      </Container>
    </div>
  );
};

export default Game;
