import classes from "./ListHead.module.css";
import Value from "./Value";

const ListHead = (props) => {
  return (
    <table className={classes.container}>
      <thead>
        <tr className={classes.table}>
          <th>Datum</th>
          <th>Art</th>
          <th>Wert</th>
        </tr>
      </thead>
      <Value />
    </table>
  );
};

export default ListHead;
