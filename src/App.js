import ListTable from "./components/ListTable";
import classes from "./App.module.css";

function App() {
  return (
    <div className={classes.container}>
      <header className={classes.AppHeader}>
        <p className={classes.AppName}>Housemeter</p>
      </header>
      <ListTable />
    </div>
  );
}

export default App;
