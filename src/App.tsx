import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import RecipeForm from "./components/RecipeForm";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<RecipeForm />} />
        <Route path="/edit/:id" element={<RecipeForm />} />
      </Routes>
    </Router>
  );
};

export default App;
