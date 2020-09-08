import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "./axios.js";

const App = () => {
  const [counterValue, setCounterValue] = useState(undefined);

  useEffect(() => {
    axios
      .get("/counterValue")
      .then((res) => {
        setCounterValue(res.data.counterValue);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const saveInDatabase = () => {
    axios
      .put("/updateCounterValue", { counterValue })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="app">
      {counterValue !== undefined && (
        <div>
          <button
            className="app__button"
            onClick={(e) => setCounterValue(counterValue + 1)}
          >
            {counterValue}
          </button>
          <button className="app__button" onClick={() => setCounterValue(0)}>
            Reset
          </button>
          <button className="app__button" onClick={saveInDatabase}>
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
