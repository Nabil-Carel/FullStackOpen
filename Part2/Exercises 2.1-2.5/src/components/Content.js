import React from "react";
import Part from "./Part";

const Content = (props) => {
  return (
    <>
      {props.parts.map((elem) => (
        <Part part={elem.name} exercises={elem.exercises} key={elem.id} />
      ))}
    </>
  );
};

export default Content;
