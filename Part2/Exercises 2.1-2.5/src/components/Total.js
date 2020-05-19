import React from "react";

const Total = (props) => {
  const total = props.parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises,
    0
  );
  return (
    <>
      <p>
        <b>{`total of ${total} exercises`}</b>
      </p>
    </>
  );
};

export default Total;
