const QuestionResult = ({ loadNextQuestion, result }) => {
  return (
    <div className="QuestionResult">
      <b>{result}</b>
      <button onClick={loadNextQuestion}>Next Question</button>
    </div>
  );
};

export default QuestionResult;
