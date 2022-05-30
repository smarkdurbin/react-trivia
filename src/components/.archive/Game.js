import React, { useCallback, useEffect, useState } from "react";
import { getQuestions } from "../api/api";
import { intervalTimer } from "../helpers/helpers";
import GameResults from "./GameResults";
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
  const [gameOver, setGameOver] = useState(false);
  const [modalCallToActionFunction, setModalCallToActionFunction] = useState();
  const [modalCallToActionText, setModalCallToActionText] = useState();
  const [modalContent, setModalContent] = useState();
  const [questions, setQuestions] = useState([]);
  const [questionsRight, setQuestionsRight] = useState(0);
  const [questionsWrong, setQuestionsWrong] = useState(0);
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

      // Set questions right.
      setQuestionsRight(questionsRight + 1);
    } else {
      // Set questions wrong.
      setQuestionsWrong(questionsWrong + 1);
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
  const endTimer = useCallback(() => {
    // Clear interval.
    clearInterval(answerTimer);
  }, [answerTimer]);

  // Load next question.
  const loadNextQuestion = useCallback(() => {
    // If questions.length EQ 0.
    if (questions.length === 0) return;

    // Next question.
    const nextQuestion = questions.pop();

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

  // Show game results.
  const showGameResults = () => {
    // Set game over.
    setGameOver(true);

    // Close modal.
    closeModal();
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
    (correct_answer, result) => {
      // Set modal content.
      setModalContent(
        <QuestionResult
          correct_answer={correct_answer}
          loadNextQuestion={loadNextQuestion}
          result={result}
        />
      );

      // If questions length GT 0.
      if (questions.length > 0) {
        // Set modal call to action function.
        setModalCallToActionFunction(() => {
          loadNextQuestion();
          closeModal();
        });

        // Set modal call to action text.
        setModalCallToActionText("Next Question");
      } else {
        // Set modal call to action function.
        setModalCallToActionFunction(() => showGameResults);

        // Set modal call to action text.
        setModalCallToActionText("Get Results");
      }

      // Open modal.
      openModal();
    },
    [loadNextQuestion]
  );

  // Start the game.
  const startGame = async () => {
    // Get questions.
    await getQuestions(1).then((questions) => {
      // Set questions.
      setQuestions(questions);
    });

    // Set questions right.
    setQuestionsRight(0);

    // Set questions wrong.
    setQuestionsWrong(0);

    // Set game over.
    setGameOver(false);

    // Set game started.
    setGameStarted(true);
  };

  // Start timer.
  const startTimer = () => {
    // Create new interval timer.
    const newIntervalTimer = intervalTimer(30, 1, (i) => setTimeToAnswer(i));

    // Set answer timer.
    setAnswerTimer(newIntervalTimer);
  };

  // Hook on current question.
  useEffect(() => {
    // If current question result.
    if (currentQuestion && "result" in currentQuestion) {
      // Show question result.
      showQuestionResult(
        currentQuestion.correct_answer,
        currentQuestion.result
      );

      // End timer.
      endTimer();
    }
  }, [currentQuestion, endTimer, showQuestionResult]);

  // Hook on game started.
  useEffect(() => {
    // If game started.
    if (gameStarted) {
      // Load next question.
      loadNextQuestion();
    }
  }, [gameStarted]);

  // Hook on questions.
  useEffect(() => {
    // If game started and questions.length EQ 0.
    if (gameStarted && questions.length === 0 && currentQuestion.result) {
      // Show game results.
      showGameResults();

      // Set game started.
      setGameStarted(false);
    }
  }, [questions]);

  // Hook on time to answer.
  useEffect(() => {
    // If time expired.
    if (timeToAnswer === 0) {
      // Set current question.
      setCurrentQuestion((prevState) => ({
        ...prevState,
        result: "EXPIRED",
      }));

      // Set questions wrong.
      setQuestionsWrong(questionsWrong + 1);
    }
  }, [timeToAnswer]);

  return (
    <div className="Game">
      <Modal
        callToActionFunction={modalCallToActionFunction}
        callToActionText={modalCallToActionText}
        content={modalContent}
        closeModal={closeModal}
        openModal={openModal}
        show={showModal}
      />
      <Header
        answerTimer={answerTimer}
        showHowToPlay={showHowToPlay}
        timeToAnswer={timeToAnswer}
      />
      <Main>
        {gameOver && (
          <GameResults
            questionsRight={questionsRight}
            questionsWrong={questionsWrong}
          />
        )}
        {gameStarted && !gameOver && (
          <Question
            {...currentQuestion}
            answerQuestion={answerQuestion}
            loadNextQuestion={loadNextQuestion}
            questionsLeft={questions.length}
            startTime={startTimer}
            timeToAnswer={timeToAnswer}
          />
        )}
        {(!gameStarted || gameOver) && (
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
