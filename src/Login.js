import React from "react";
import classes from "./Login.module.css";
import { supabase } from "./SupabaseClient";

const Login = (props) => {
  async function signInHandlerWithDiscord() {
    await supabase.auth.signIn({
      provider: "discord",
    });
  }

  return (
    <React.Fragment>
      <div className={classes.headlineContainer}>
        <h1 className={classes.LoginH1}>Housemeter</h1>
        <h2>This app makes your meter readings clear.</h2>
        <h3>Please sign in with Discord</h3>
        <button
          className={classes.LoginButton}
          type="button"
          onClick={signInHandlerWithDiscord}
        >
          Discord
        </button>
      </div>
    </React.Fragment>
  );
};

export default Login;
