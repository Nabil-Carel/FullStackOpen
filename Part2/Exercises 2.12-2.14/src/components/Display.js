import React, { useState } from "react";
import Country from "./Country";

const Display = ({ countries }) => {
  const [buttons, setButtons] = useState(
    countries.map(() => {
      return { value: "show", clicked: false };
    })
  );

  const handleButtonClick = (event) => {
    const target = event.target;
    if (target.tagName !== "BUTTON") {
      return;
    }
    const list = document.getElementById("list");
    const index = Array.prototype.indexOf.call(
      list.childNodes,
      target.parentElement
    );

    const newButtons = [...buttons];
    if (newButtons[index].value === "show") {
      newButtons[index].value = "hide";
    } else {
      newButtons[index].value = "show";
    }

    newButtons[index].clicked = !newButtons[index].clicked;
    setButtons(newButtons);
  };

  const temp = countries.map((elem, index) => (
    <li key={elem.name}>
      {elem.name} <button>{buttons[index].value}</button>
      <>
        {buttons.length > 0 && buttons[index].clicked ? (
          <Country country={elem} />
        ) : null}
      </>
    </li>
  ));

  switch (countries.length) {
    case 0:
      return <p>No match</p>;
    case 1:
      return <Country country={countries[0]} />;
    default:
      return (
        <ul
          id="list"
          style={{ listStyleType: "none", marginLeft: "0" }}
          onClick={handleButtonClick}
        >
          {temp}
        </ul>
      );
  }
};

export default Display;
