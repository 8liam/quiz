import "./App.css";
import Navbar from "./components/navbar";
import Landing from "./sections/landing";
import Quizzes from "./sections/quizzes";
import Quiz from "./sections/quiz";
function App() {
  return (
    <>
      <Navbar />
      <main className="">
        <Landing />
        <Quizzes />
        <Quiz />
      </main>
    </>
  );
}

export default App;
