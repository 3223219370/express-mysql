import { useState } from "react";
import "./App.css";
import Crud from "./pages/Crud";
import Login from "./pages/Login";
export default function App() {
  const [currentRoot, setCurrentRoot] = useState("login");
  return (
    <>
      {currentRoot === "crud" && <Crud />}
      {currentRoot === "login" && <Login setCurrentRoot={setCurrentRoot}/>}
    </>
  );
}
