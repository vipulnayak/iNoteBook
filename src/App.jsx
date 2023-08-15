import "./App.css";
import { lazy, Suspense } from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import NoteState from "./context/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/SignUp";

const Home = lazy(() => import("./components/Home"));
const About = lazy(() => import("./components/About"));
const Redirect = lazy(() => import("./Components/Redirect"));

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <>
      <div className="App">
        <NoteState>
          <Suspense fallback={<h1 className="text-center">Loading....</h1>}>
            <Navbar />
            <Alert alert={alert} />
            <div className="container">
              <Routes>
                <Route
                  exact
                  path="/"
                  element={<Home showAlert={showAlert} />}
                />
                <Route exact path="/about" element={<About />} />
                <Route
                  exact
                  path="/login"
                  element={<Login showAlert={showAlert} />}
                />
                <Route
                  exact
                  path="/signup"
                  element={<Signup showAlert={showAlert} />}
                />
                <Route path="*" element={<Redirect />} />
              </Routes>
            </div>
          </Suspense>
        </NoteState>
      </div>
    </>
  );
}

export default App;
