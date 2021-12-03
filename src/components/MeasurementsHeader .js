import React from "react";
import classes from "./MeasurementsHeader.module.css";

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
    </React.Fragment>
  );
};

export default ListTable;
