import classes from "./Value.module.css";

const Value = (props) => {
  const readings = [
    {
      date: "2021-01-10",
      type: "Strom",
      value: 100 + " kwh",
      id: Math.random().toString(),
    },
    {
      date: "2021-02-28",
      type: "Wasser",
      value: 11 + " m3",
      id: Math.random().toString(),
    },
  ];

  return (
    <tbody className={classes.container}>
      {readings.map((reading) => (
        <tr className={classes.tr} key={reading.id}>
          <td>{reading.date}</td>
          <td>{reading.type}</td>
          <td>{reading.value}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default Value;
