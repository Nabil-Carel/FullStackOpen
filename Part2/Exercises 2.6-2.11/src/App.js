import React, { useState, useEffect } from "react";
import axios from "axios";
import PhonebookDisplay from "./components/PhonebookDisplay";
import Form from "./components/Form";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");

  const url = "http://localhost:3001/persons";
  const hook = () => {
    axios.get(url).then((response) => {
      setPersons(response.data);
      console.log("response", response.data);
      console.log("persons", persons);
    });
  };

  useEffect(hook, []);

  const onNameChange = (event) => setNewName(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    const nameInArray = persons.findIndex((elem) => elem.name === newName);
    if (nameInArray >= 0) {
      alert(`${newName} is already in phonebook`);
    } else {
      const newPersons = persons.concat({
        name: newName,
        number: number,
        id: persons.length + 1,
      });
      setPersons(newPersons);
      setNewName(" ");
    }
  };

  const onNumberChange = (event) => setNumber(event.target.value);
  const onFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredContent = persons.filter((elem) => elem.name.includes(filter));
  const personsToDisplay = filter === "" ? persons : filteredContent;

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input value={filter} onChange={onFilterChange} />
      </div>
      <h2>add a new</h2>
      <Form
        name={newName}
        number={number}
        onNameChange={onNameChange}
        onNumberChange={onNumberChange}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <PhonebookDisplay persons={personsToDisplay} />
    </div>
  );
};

export default App;
