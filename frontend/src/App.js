import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./pages/Home";
import CustomCursor from "./pages/CustomCursor";

function App() {
  return (
    <div className="App">
      <CustomCursor />
      <Home />
    </div>
  );
}

export default App;
