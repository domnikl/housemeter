
import classes from "./ListTable.module.css";
import Value from "./Value";

const ListTable = (props) => {
  return (
    <table className={classes.container}>
      <thead>
        <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Value</th>
        </tr>
      </thead>
      <Value />
    </table>
  );
};

export default ListTable;
