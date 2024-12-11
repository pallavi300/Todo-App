import React, { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Header from "./components/Header";

function App() {
 
  return (
    <div className="container">
      <div className="app-wrapper">
        <div className="Header">
          <Header />
        </div>
        {/* <div>
          <Form
            input={input}
            setInput={setInput}
            todos={todos}
            setTodos={setTodos}
          />
        </div> */}
        <div>
          <Form/>
        </div>
      </div>
    </div>
  );
}

export default App;
