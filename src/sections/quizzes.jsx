import { useEffect, useState } from "react";
export default function Quizzes() {

  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  // List of Quizzes. Used to map to cards.
  const quizzes = [
    {
      "title": "General Knowledge",
      "description": "A quiz covering a broad range of topics to test your general awareness and knowledge."
    },
    {
      "title": "Mathematics",
      "description": "A quiz focused on mathematical concepts, including arithmetic, algebra, geometry, and more."
    },
    {
      "title": "History",
      "description": "Explore historical events, figures, and civilizations in this quiz to test your knowledge of the past."
    },
    {
      "title": "Geography",
      "description": "Test your knowledge of the world's continents, countries, cities, and physical features with this geography quiz."
    }
  ];

  const showQuizInfo = (title) => {
    for (let i = 0; i < quizzes.length; i++) {
      if (quizzes[i].title === title) {
        setQuizTitle(quizzes[i].title);
        setQuizDescription(quizzes[i].description)
      }
    }
  };


  return (
    <div className="bg-secondary text-white w-full xl:px-[20%] sm:max-xl:px-[15%] max-sm:px-[2.5%] py-8" id="quizzes">
      <div className="space-y-4">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-center">Pick a Quiz Topic</h1>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {quizzes.map((quiz) => (
            <a
              key={quiz.title}
              className="flex flex-col p-4 items-center justify-center border-2 border-solid border-accent bg-primary text-white rounded-xl"
              onClick={() => showQuizInfo(quiz.title)}
            >
              <div className="text-md mx-4">
                <h1 className="font-medium">{quiz.title}</h1>
              </div>
            </a>
          ))}


        </div>
        {quizTitle && (
          <div className="w-full">
            <h1 className="font-semibold">
              {quizTitle}</h1>
            <p>{quizDescription}</p>
            <div className="flex">
              <a className="p-2 border-accent bg-primary border rounded-xl mx-auto">Begin Quiz</a>

            </div>
          </div>

        )}
      </div>
    </div>
  );
}