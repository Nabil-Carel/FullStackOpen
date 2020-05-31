import React from "react";

const PhonebookDisplay = ({ persons, handleDelete }) => {
  const temp = persons.map((elem) => (
    <li key={elem.id}>
      {elem.name + " " + elem.number}
      <button onClick={() => handleDelete(elem.id, elem.name)}>delete</button>
    </li>
  ));
  return <ul style={{ listStyleType: "none", paddingLeft: "0" }}>{temp}</ul>;
};

export default PhonebookDisplay;
