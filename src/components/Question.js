import { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    const timerID = setTimeout(() => {
      setTimeRemaining(timeRemaining - 1)
    }, 1000)

    // Cleanup arrow function
    return () => clearTimeout(timerID)
  }, [timeRemaining])

  if (timeRemaining === 0) {
    setTimeRemaining(10)
    onAnswered(false)
  }

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  const areSecondsPlural = timeRemaining === 1 ? 'second' : 'seconds'

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} {areSecondsPlural} remaining</h5>
    </>
  );
}

export default Question;
