import React from "react";
import classes from "./Login.module.css";
import { SupabaseClient } from "@supabase/supabase-js";

const Login = () => {
  const handleClick = (event) => {
    console.log("button is clicked!");
  };

  async function signInWithDiscord() {
    const { user, session, error } = await SupabaseClient.auth.signIn({
      provider: "discord",
    });
  }

  return (
    <React.Fragment>
      <div className={classes.headlineContainer}>
        <h1 className={classes.LoginH1}>Housemeter</h1>
        <h2>This app makes your meter readings clear.</h2>
        <h3>Pleas sign in with Discord</h3>
      </div>
      <button
        className={classes.LoginButton}
        type="button"
        onClick={handleClick}
        onChange={signInWithDiscord}
        defaultValue={process.env.REACT_APP_SUPABASE_API_KEY}
      >
        Discord
      </button>
    </React.Fragment>
  );
};

export default Login;
