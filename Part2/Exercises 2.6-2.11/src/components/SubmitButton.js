import React from "react";

const SubmitButton = ({ handleSubmit, text }) => (
  <button type="submit" onClick={handleSubmit}>
    {text}
  </button>
);

export default SubmitButton;
