import classes from "./App.module.css";
import React from "react";
import Measurments from "./components/Measurements";
import Login from "./Login";

function App() {
  return (
    <React.Fragment>
      <Login />
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
