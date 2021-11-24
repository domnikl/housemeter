
import classes from "./ListHead.module.css";
import Value from "./Value";

const ListHead = (props) => {
  return (
    <table className={classes.container}>
      <thead>
        <tr className={classes.table}>
          <th>Date</th>
          <th>Type</th>
          <th>Value</th>
        </tr>
      </thead>
      <Value />
    </table>
  );
};

export default ListHead;
