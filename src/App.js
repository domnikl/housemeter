import classes from "./App.module.css";
import React from "react";
import Measurments from "./components/Measurements";

function App() {
  return (
    <React.Fragment>
      {/* <div class="diagonal-bg">
        <svg xmlns="http://www.w3.org/2000/svg" width="1000px" height="1000px">
          <line
            x1="100%"
            y1="0"
            x2="1"
            y2="100%"
            stroke="#FF4B3B"
            stroke-width="30%"
          />
        </svg>
      </div> */}
      <div className={classes.container}>
        <header className={classes.AppHeader}>
          <p className={classes.AppName}>Housemeter</p>
        </header>
        <Measurments />
      </div>
    </React.Fragment>
  );
}

export default App;
