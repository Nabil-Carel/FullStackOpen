import React from "react";

const PhonebookDisplay = ({ persons }) => {
  const temp = persons.map((elem) => (
    <li key={elem.id}>{elem.name + " " + elem.number}</li>
  ));
  return <ul style={{ listStyleType: "none", paddingLeft: "0" }}>{temp}</ul>;
};

export default PhonebookDisplay;
