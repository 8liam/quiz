import { useEffect, useState } from "react";
import axios from "axios";

export default function Quiz(props) {
  const { quizName, closeQuiz } = props;
  const [quizData, setQuizData] = useState([]);
  const [closed, setClosed] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [questionID, setQuestionID] = useState(1);

  useEffect(() => {
    setClosed(false);
    setQuestionID(1);

    const fetchQuizData = async () => {
      try {
        // Check if quizName is not empty before making the API call
        if (quizName) {
          const response = await axios.get(`/questions/${quizName}.json`);
          console.log("Response data:", response.data);  // Add this line for debugging
          setQuizData(response.data);
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuizData().catch((error) => {
      console.error("Unhandled promise rejection:", error);
    });

    // Initialize score when the component mounts
    setScore(0);
  }, [quizName]);

  const closeCurrentQuiz = () => {
    setClosed(true);
    closeQuiz();
  };

  const selectOption = (option) => {
    setSelectedOption(option);
  };

  const submitOption = () => {
    if (quizData[questionID - 1]?.answer === selectedOption) {
      setScore((prevScore) => {
        const newScore = prevScore + 1;
        console.log("Correct!, score is now", newScore);
        return newScore;
      });
    } else {
      console.log("Wrong, answer was", quizData[questionID - 1]?.answer);
    }
    setQuestionID((prevID) => {
      const newID = prevID + 1;
      return newID;
    })

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
              {quizName}
            </h2>
          </div>
          <div className="space-y-2">
            {questionNumber ? (
              <h2 className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl lg:text-3xl/none">
                Question {questionNumber}
              </h2>
            ) : (
              <div className="flex text-center">
                <h2 className="text-2xl font-semibold text-center">Score: {score}/{quizData.length}</h2>
              </div>
            )}
            <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              {question}
            </p>
          </div>
          <div className="grid grid-cols-4 gap-8 min-[400px]:flex-row text-xl">
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
            <p className="text-lg text-gray-500 dark:text-gray-400">
              Question <b className="text-gray-400 ">{questionID} </b> of {quizData.length}
            </p>

          ) : (
            <p className="text-lg text-gray-500 dark:text-gray-400">
              Quiz Complete
            </p>
          )}
          {questionID <= quizData.length && (
            <p className="text-lg text-gray-500 dark:text-gray-400">
              Score <b className="text-gray-400 ">{score} </b> / {quizData.length}
            </p>

          )
          }
          {questionID <= quizData.length ? (
            <a
              className="mt-4 bg-primary p-2 rounded-xl text-white border border-accent font-bold cursor-pointer hover:bg-accent hover:text-black duration-300"
              onClick={submitOption}
            >
              Submit Answer
            </a>

          ) : (
            <a className="p-2 rounded-xl border border-red-400 cursor-pointer" onClick={closeCurrentQuiz}>
              Quit
            </a>
          )
          }

          <div className="flex space-x-40 justify-between">
            <div className="p-2 rounded-xl border border-red-400 cursor-pointer">
              <p>Go Back</p>
            </div>
            <div className="p-2 rounded-xl border border-green-400 cursor-pointer">
              <p>Forward</p>
            </div>
          </div>
          {questionID <= quizData.length && (
            < a className="p-2 rounded-xl border border-red-400 cursor-pointer" onClick={closeCurrentQuiz}>
              Quit
            </a>

          )
          }

        </div>
      </div>
    </section >
  ) : null;
}
