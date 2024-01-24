import "./App.css";
import Navbar from "./components/navbar";
import Landing from "./sections/landing";
import Quizzes from "./sections/quizzes";
function App() {
  return (
    <>
      <Navbar />
      <main className="">
        <Landing />
        <Quizzes />

      </main>
    </>
  );
}

export default App;
