import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/navbar">
          <Navbar />
        </Route>
      </Routes>
    </>
  );
}

export default App;
