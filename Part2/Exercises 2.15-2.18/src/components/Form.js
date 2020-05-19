import React from "react";
import SubmitButton from "./SubmitButton";

const Form = ({ name, number, onNameChange, onNumberChange, handleSubmit }) => (
  <form>
    <div>
      name: <input value={name} onChange={onNameChange} />
    </div>
    <div>
      number: <input value={number} onChange={onNumberChange} />
    </div>

    <SubmitButton handleSubmit={handleSubmit} text="add" />
  </form>
);

export default Form;
