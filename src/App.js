import ListHead from "./components/ListHead";
import classes from "./App.module.css";

function App() {
  return (
    <div className={classes.App}>
      <header className={classes.AppHeader}>
        <p className={classes.p}>Housemeter</p>
        <ListHead />
      </header>
    </div>
  );
}

export default App;
