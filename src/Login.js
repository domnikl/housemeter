import React from "react";
import classes from "./Login.module.css";
import { supabase } from "./SupabaseClient";
import Logo from "./img/home--v1.png";

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
        <img src={Logo} alt="Logo" className={classes.logo} />
        <div className={classes.wrappingTextAndButton}>
          <h2 className={classes.appText}>
            This app makes your meter readings clear.
          </h2>
          <h3 className={classes.signIn}>Please SignIn with Discord</h3>
        </div>
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
