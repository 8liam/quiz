import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Quiz(props) {
  const { quizName, closeQuiz, uploadedQuiz } = props;
  const [quizData, setQuizData] = useState([]);
  const [closed, setClosed] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [questionID, setQuestionID] = useState(1);
  const [timer, setTimer] = useState(20); // 20 seconds timer

  useEffect(() => {
    setClosed(false);
    setQuestionID(1);
    setTimer(20);

    const fetchQuizData = async () => {
      try {
        let data;

        if (quizName !== "uploaded") {
          const lowerCaseQuizName = quizName.toLowerCase();
          const response = await axios.get(`/questions/${lowerCaseQuizName}.json`);
          data = response.data;
        } else {
          data = uploadedQuiz;
        }

        if (Array.isArray(data)) {
          setQuizData(data);
        } else {
          console.error("Invalid quiz data format");
        }
      } catch (error) {
        console.error("Error fetching or processing quiz data:", error);
      }
    };

    fetchQuizData().catch((error) => {
      console.error("Unhandled promise rejection:", error);
    });

    setScore(0);
  }, [quizName, uploadedQuiz]);

  useEffect(() => {
    let timerInterval;

    if (questionID <= quizData.length) {
      timerInterval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            clearInterval(timerInterval);
            handleTimeout();
            return 20; // Reset the timer for the next question
          } else {
            return prevTimer - 1;
          }
        });
      }, 1000);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [questionID, quizData]);

  const handleTimeout = () => {
    setQuestionID((prevID) => prevID + 1);
    setSelectedOption(""); // Reset selected option
  };

  const closeCurrentQuiz = () => {
    setClosed(true);
    closeQuiz();
  };

  const selectOption = (option) => {
    setSelectedOption(option);
  };

  const submitOption = () => {
    if (quizData[questionID - 1]?.answer === selectedOption) {
      setScore((prevScore) => prevScore + 1);
    }

    setQuestionID((prevID) => prevID + 1);
    setSelectedOption("");
    setTimer(20); // Reset timer for the next question
  };

  let questionNumber = quizData[questionID - 1]?.id;
  let question = quizData[questionID - 1]?.question;
  let options = quizData[questionID - 1]?.options;

  return quizData.length > 0 ? (
    <section className="bg-primary text-white max-w-[100vw] xl:px-[20%] sm:max-xl:px-[15%] max-sm:px-[2.5%] py-8">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl/none">
              {quizName == "uploaded" ? "Custom Quiz" : quizName}
            </h2>
          </div>
          <div className="space-y-2">
            {questionNumber ? (
              <h2 className="text-lg font-semibold tracking-tighter sm:text-xl md:text-xl lg:text-2xl/none">
                Question {questionNumber}
              </h2>
            ) : (
              <div className="flex text-center">
                <h2 className="text-2xl font-semibold text-center">Score: {score}/{quizData.length}</h2>
              </div>
            )}
            <p className="text-gray-100 text-xl md:text-2xl/relaxed lg:text-base/relaxed xl:text-2xl/relaxed dark:text-gray-400">
              {question}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 min-[400px]:flex-row text-xl">
            {Array.isArray(options)
              ? options.map((option, index) => (
                <button
                  key={index}
                  className="bg-primary border border-accent p-2 rounded-xl hover:bg-accent hover:text-black duration-300 cursor-pointer focus:bg-accent focus:text-black"
                  onClick={() => selectOption(option)}
                >
                  {option}
                </button>
              ))
              : null
            }
          </div>
          <div className="w-full h-2 mt-4 bg-gray-200 rounded">
            <div
              className="h-full bg-accent rounded"
              style={{
                width: `${(questionNumber / quizData.length) * 100}%`,
              }}
            />
          </div>
          {questionID <= quizData.length ? (
            <>
              <p className="text-lg text-gray-500 dark:text-gray-400">
                Timer: {timer} seconds
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-400">
                Question <b className="text-gray-400 ">{questionID} </b> of {quizData.length}
              </p>
            </>


          ) : (
            <div>
              <p className="text-lg text-gray-500 dark:text-gray-400">
                Quiz Complete
              </p>
              <div>
                <p className="text-lg text-gray-500 dark:text-gray-400">
                  Answers
                </p>
                <ol>
                  {quizData.map((question, index) => (
                    <li key={index}>
                      Q{question.id} - {question.answer}
                    </li>
                  ))}
                </ol>

              </div>

            </div>
          )}
          {questionID <= quizData.length && (
            <p className="text-lg text-gray-500 dark:text-gray-400">
              Score <b className="text-gray-400 ">{score} </b> / {quizData.length}
            </p>

          )
          }
          {questionID <= quizData.length ? (
            <a
              className={`mt-4 bg-primary p-2 rounded-xl text-white border border-accent font-bold cursor-pointer hover:bg-accent hover:text-black duration-300 ${selectedOption === "" ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => selectedOption !== "" && submitOption()}
              style={{ pointerEvents: selectedOption === "" ? "none" : "auto" }}
            >
              Submit Answer
            </a>

          ) : (
            <a className="p-2 rounded-xl border border-red-400 cursor-pointer hover:bg-red-400 hover:text-white duration-300" onClick={closeCurrentQuiz}>
              Quit
            </a>
          )
          }

          <div className="flex space-x-40 justify-between">

            {questionID <= quizData.length && (
              < a className="p-2 rounded-xl border border-red-400 cursor-pointer  hover:bg-red-400 hover:text-white duration-300" onClick={closeCurrentQuiz}>
                Quit
              </a>

            )
            }
          </div>

        </div>
      </div>
    </section >
  ) : null;
}
