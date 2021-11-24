import ListHead from "./components/ListHead";
import classes from "./App.module.css";
import backgroundImage from './img/Colorful-Watercolor-Background-Graphics-8158369-1.jpg'

function App() {
  return (
    <div style={{ backgroundImage: `url(${backgroundImage})` }}>
    <div className={classes.App}>
      <header className={classes.AppHeader}>
        <p className={classes.p}>Housemeter</p>
        <ListHead />
      </header>
    </div>
    </div>
  );
}

export default App;
