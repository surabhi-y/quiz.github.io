import React from "react";

const Questionair = ({
  handleAnswer,
  handleNextQuestion,
  showAnswer,
  data: { question, correct_answer, answers }
}) => {
  return (
    <div>
      <div>
        <h1 dangerouslySetInnerHTML={{ __html: question }} />
      </div>

      <div className='button-flex'>
        {answers.map((answer) => {
          const textColor = showAnswer
            ? answer === correct_answer
              ? "text-green"
              : "text-red"
            : "text-white";

          return (
            <button
              className={`${textColor} other css`}
              onClick={() => handleAnswer(answer)}
              dangerouslySetInnerHTML={{ __html: answer }}
            />
          );
        })}
      </div>
      {showAnswer && (
        <button className={`anythcss`} onClick={handleNextQuestion}>
          Next Question
        </button>
      )}
    </div>
  );
};

export default Questionair;
