import classes from "./App.module.css";
import React, { useEffect, useState } from "react";
import MeasurementsTable from "./components/MeasurementsTable";
import PasswordLogin from "./components/PasswordLogin";
import { checkApiHealth, isAuthenticated } from "./ApiClient";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is already authenticated
    if (isAuthenticated()) {
      checkApiHealth()
        .then((isHealthy) => {
          setIsLoggedIn(isHealthy);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoggedIn(false);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  function handleLogin() {
    setIsLoggedIn(true);
  }

  function handleLogout() {
    sessionStorage.removeItem("housemeter_password");
    setIsLoggedIn(false);
  }

  if (isLoading) {
    return (
      <div className={classes.container}>
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      {!isLoggedIn ? (
        <PasswordLogin onLogin={handleLogin} />
      ) : (
        <div className={classes.container}>
          <button onClick={handleLogout} className={classes.logoutbutton}>
            Sign out
          </button>
          <header className={classes.AppHeader}>
            <p className={classes.AppName}>Housemeter</p>
          </header>
          <MeasurementsTable />
        </div>
      )}
    </React.Fragment>
  );
}

export default App;
