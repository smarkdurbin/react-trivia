import React, { useCallback, useEffect, useState } from "react";
import { testQuestions } from "../api/test_data";
import { intervalTimer } from "../helpers/helpers";
import Header from "./Header";
import HowToPlay from "./HowToPlay";
import Main from "./Main";
import Modal from "./Modal";
import Question from "./Question";
import QuestionResult from "./QuestionResult";
import Start from "./Start";

const Game = () => {
  // State.
  const [answerTimer, setAnswerTimer] = useState();
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [gameStarted, setGameStarted] = useState(false);
  const [modalContent, setModalContent] = useState();
  const [questions, setQuestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [timeToAnswer, setTimeToAnswer] = useState();

  // Answer question.
  const answerQuestion = (answer) => {
    // Define result.
    let result = "INCORRECT";

    // If answer EQ current question correct answer.
    if (answer === currentQuestion.correct_answer) {
      // Define result.
      result = "CORRECT";
    }

    // Set current question.
    setCurrentQuestion((prevState) => ({
      ...prevState,
      result,
    }));
  };

  // Close modal.
  const closeModal = () => {
    // Set show modal.
    setShowModal(false);
  };

  // End timer.
  // const endTimer = () => {};

  const endTimer = useCallback(() => {
    // Clear interval.
    clearInterval(answerTimer);
  }, [answerTimer]);

  // Load next question.
  const loadNextQuestion = useCallback(() => {
    // Next question.
    const nextQuestion = questions.pop();

    // Close modal.
    closeModal();

    // Set current question.
    setCurrentQuestion(nextQuestion);

    // Start timer.
    startTimer();
  }, [questions]);

  // Open modal.
  const openModal = () => {
    // Set show modal.
    setShowModal(true);
  };

  // Show how to play.
  const showHowToPlay = () => {
    // Set modal content.
    setModalContent(<HowToPlay />);

    // Open modal.
    openModal();
  };

  // Show question result.
  const showQuestionResult = useCallback(
    (result) => {
      // Set modal content.
      setModalContent(
        <QuestionResult loadNextQuestion={loadNextQuestion} result={result} />
      );

      // Open modal.
      openModal();
    },
    [loadNextQuestion]
  );

  // Start the game.
  const startGame = () => {
    // Set game started.
    setGameStarted(true);

    // Load next question.
    loadNextQuestion();
  };

  // Start timer.
  const startTimer = () => {
    // Create new interval timer.
    const newIntervalTimer = intervalTimer(30, 1, (i) => setTimeToAnswer(i));

    // Set answer timer.
    setAnswerTimer(newIntervalTimer);
  };

  // Hook on component mount.
  useEffect(() => {
    // Set questions.
    setQuestions(testQuestions);
  }, []);

  // Hook on current question.
  useEffect(() => {
    // If current question result.
    if ("result" in currentQuestion) {
      // Show question result.
      showQuestionResult(currentQuestion.result);

      // End timer.
      endTimer();
    }
  }, [currentQuestion, endTimer, showQuestionResult]);

  // Hook on time to answer.
  useEffect(() => {
    // If time expired.
    if (timeToAnswer === 0) {
      // Set current question.
      setCurrentQuestion((prevState) => ({
        ...prevState,
        result: "EXPIRED",
      }));
    }
  }, [timeToAnswer]);

  return (
    <div className="Game">
      <Modal content={modalContent} closeModal={closeModal} show={showModal} />
      <Header timeToAnswer={timeToAnswer} />
      <Main>
        {gameStarted ? (
          <Question
            {...currentQuestion}
            startTime={startTimer}
            timeToAnswer={timeToAnswer}
            answerQuestion={answerQuestion}
          />
        ) : (
          <Start
            openModal={openModal}
            showHowToPlay={showHowToPlay}
            startGame={startGame}
          />
        )}
      </Main>
    </div>
  );
};

export default Game;
