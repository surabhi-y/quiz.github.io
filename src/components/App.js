import React, { useEffect, useState } from "react";
import Questionair from "./Questionair";

function App() {
  const [questions, setquestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=8&category=11&difficulty=easy&type=multiple"
    )
      .then((res) => res.json())
      .then((data) => {
        const questions = data.results.map((question) => ({
          ...question,
          answers: [
            question.correct_answer,
            ...question.incorrect_answers
          ].sort(() => Math.random() - 0.5)
        }));

        setquestions(questions);
      });
  }, []);

  const handleAnswer = (answer) => {
    //check for the answer
    if (!showAnswer) {
      if (answer === questions[currentIndex].correct_answer) {
        setScore(score + 1);
      }
    }
    setShowAnswer(true);
  };

  const handleNextQuestion = () => {
    setCurrentIndex(currentIndex + 1);
    setShowAnswer(false);
  };

  return (

    <div className='flex'>

      {questions.length > 0 ? (
        <div className="container">
          {currentIndex >= questions.length ? (
            <h1 className="anything">Game ended! your score is: {score}.</h1>
          ) : (
              <Questionair
                handleAnswer={handleAnswer}
                handleNextQuestion={handleNextQuestion}
                showAnswer={showAnswer}
                data={questions[currentIndex]}
              />
            )}
        </div>
      ) : (
          <div className="container">loading....</div>
        )
      }
    </div>
  )
}
export default App;
