import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import {  Routes, Route, Router } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import { Alert } from "./Components/Alert";
import NoteState from "./context/Notestate";

function App() {
  return (
    <>
      <NoteState>
        <Navbar />
        <Alert message="This is amazing React course" />
        <div className="container">
           <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/about" element={<About/>}/>
        </Routes>
        </div>
      </NoteState>
    </>
  )
}

export default App;
