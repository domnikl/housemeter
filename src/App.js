import ListTable from "./components/ListTable";
import classes from "./App.module.css";
// import backgroundImage from './img/Colorful-Watercolor-Background-Graphics-8158369-1.jpg'


function App() {
  return (
    <div className={classes.container}>
      <header className={classes.AppHeader}>
        <p className={classes.AppName}>Housemeter</p>
      </header>
      <ListTable />
      {/* <div style={{ backgroundImage: `url(${backgroundImage})` }}></div> */}
    </div>
  );
}

export default App;
