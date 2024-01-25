import { useEffect, useState } from "react";
import Quiz from "./quiz";

export default function Quizzes() {

  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [quizStarted, setQuizStarted] = useState("");
  const [closed, setClosed] = useState(false);
  const [uploadedQuiz, setUploadedQuiz] = useState(null);

  // List of Quizzes. Used to map to cards.

  const example = [
    {
      "id": 1,
      "question": "How many legs does a dog have",
      "answer": "4",
      "options": [
        "5",
        "6",
        "1",
      ]
    }
  ]



  const quizzes = [
    {
      "title": "Geography",
      "description": "Test your knowledge of the world's continents, countries, cities, and physical features with this geography quiz."
    },
    {
      "title": "Mathematics",
      "description": "A quiz focused on mathematical concepts, including arithmetic, algebra, geometry, and more."
    },
    {
      "title": "Upload",
      "description": "Create your own questions in a .json file format and test yourself. Follow the example below for json structure."
    }
  ];

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const quizData = JSON.parse(e.target.result);
          setUploadedQuiz(quizData);
          console.log(quizData);
        } catch (error) {
          console.error("Error parsing uploaded quiz data:", error);
        }
      };

      reader.readAsText(file);

    }
  };

  const showQuizInfo = (title) => {
    for (let i = 0; i < quizzes.length; i++) {
      if (quizzes[i].title === title) {
        setQuizTitle(quizzes[i].title);
        setQuizDescription(quizzes[i].description);
        setClosed(false);

        // Only set quizStarted to title if it hasn't started yet
        if (quizStarted === null) {
          setQuizStarted(null); // Clear the previous selection
        }
      }
    }
  };

  const closeQuiz = () => {
    setQuizStarted(null);
  };

  const beginQuiz = () => {
    setQuizStarted(quizTitle);
  };



  return (
    <>

      <div className="bg-secondary text-white w-full xl:px-[20%] sm:max-xl:px-[15%] max-sm:px-[2.5%] py-8" id="quizzes">
        <div className="space-y-4">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-center">Pick a Quiz Topic</h1>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {quizzes.map((quiz) => (
              <a
                key={quiz.title}
                className="flex flex-col p-2 items-center justify-center border-2 border-solid border-accent bg-primary text-white rounded-xl cursor-pointer hover:bg-accent hover:text-black duration-300 focus:bg-accent focus:text-black"
                onClick={() => showQuizInfo(quiz.title)}
                href="#"
              >
                <div className="text-md mx-4">
                  <h1 className="font-medium">{quiz.title}</h1>
                </div>
              </a>
            ))}


          </div>
          {quizTitle && quizTitle !== "Upload" && (
            <div className="w-full text-center">
              <h1 className="font-semibold text-2xl">{quizTitle}</h1>
              <p>{quizDescription}</p>
              <div className="flex mt-4">
                <a
                  className="p-2 border-accent bg-primary border rounded-xl mx-auto cursor-pointer hover:bg-accent hover:text-black duration-300"
                  onClick={beginQuiz} // Use beginQuiz function
                >
                  Begin Quiz
                </a>
              </div>
            </div>
          )}
          {quizTitle === "Upload" && (
            <div className="w-full text-center">
              <h1 className="font-semibold text-2xl">{quizTitle}</h1>
              <p>{quizDescription}</p>
              <input
                type="file"
                accept=".json"
                onChange={handleFileChange}
                className="mt-4"
              />
              {!uploadedQuiz && (
                <pre className="bg-black overflow-auto text-left mt-4">
                  <code className="text-white bg-black">
                    {JSON.stringify(example, null, 2)}
                  </code>
                </pre>
              )}
              <div className="flex mt-4">
                <a
                  className="p-2 border-accent bg-primary border rounded-xl mx-auto cursor-pointer hover:bg-accent hover:text-black duration-300"
                  onClick={() => setQuizStarted("uploaded")} // Set a custom name for the uploaded quiz
                >
                  Start Custom Quiz
                </a>
              </div>
            </div>

          )}
        </div>
      </div>
      {quizStarted === "uploaded" && uploadedQuiz !== null ? (
        <Quiz quizName="uploaded" closeQuiz={closeQuiz} uploadedQuiz={uploadedQuiz} />
      ) : null
      }
      {quizStarted !== null && (
        <Quiz quizName={quizStarted} closeQuiz={closeQuiz} />
      )}



    </>
  )
}
