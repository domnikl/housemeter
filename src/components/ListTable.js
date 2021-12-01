import React from "react";
import classes from "./ListTable.module.css";
import Value from "./Value";
// import SelectMenu from "./SelectMenu";

const ListTable = (props) => {
  return (
    <React.Fragment>
      {/* <SelectMenu /> */}
      <table className={classes.container}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Measurements</th>
          </tr>
        </thead>
      </table>
      <Value />
    </React.Fragment>
  );
};

export default ListTable;
