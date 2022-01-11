import classes from "./App.module.css";
import React, { useEffect, useState } from "react";
import Measurments from "./components/Measurements";
import Login from "./Login";
import { supabase } from "./SupabaseClient";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user ?? null);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null);
      }
    );
    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut().catch(console.error);

    setUser(false);
  }

  return (
    <React.Fragment>
      {!user ? (
        <Login supabase={supabase} />
      ) : (
        <div className={classes.container}>
          <button user={user} onClick={handleLogout}>
            Sign out
          </button>
          <header className={classes.AppHeader}>
            <p className={classes.AppName}>Housemeter</p>
          </header>
          <Measurments />
        </div>
      )}
    </React.Fragment>
  );
}

export default App;
