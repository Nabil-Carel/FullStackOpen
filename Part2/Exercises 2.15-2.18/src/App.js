import React, { useState, useEffect } from "react";
import personService from "./services/persons";
import PhonebookDisplay from "./components/PhonebookDisplay";
import Form from "./components/Form";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);
  const [notificationStyle, setNotificationStyle] = useState({
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  });

  const hook = () => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((error) => {
        console.log("error", error);
        setNotification("Something went wrong...");
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      });
  };

  useEffect(hook, []);

  const onNameChange = (event) => setNewName(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: number,
    };
    const index = persons.findIndex((elem) => elem.name === newPerson.name);
    console.log("index", index);
    if (index >= 0) {
      const id = persons[index].id;
      if (
        window.confirm(
          `${persons[index].name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(id, newPerson)
          .then((returnedObject) =>
            setPersons(
              persons.map((elem) =>
                elem.id === returnedObject.id ? returnedObject : elem
              )
            )
          )
          .catch((error) => {
            alert("Something went...");
          });
      } else {
        return;
      }
    } else {
      personService
        .create(newPerson)
        .then((returnedObject) => {
          setPersons(persons.concat(returnedObject));
          setNotificationStyle({ color: "green", ...notificationStyle });

          setNotification(`Added ${newPerson.name}.`);
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        })
        .catch((error) => {
          setNotification(`Could not add ${newPerson.name} to the server.`);
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        });
    }
    setNewName("");
    setNumber("");
  };

  const onNumberChange = (event) => setNumber(event.target.value);
  const onFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((elem) => elem.id !== id));
        })
        .catch((error) => {
          setNotification(`${name} was already removed from server`);
          setNotificationStyle({ ...notificationStyle, color: "red" });
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        });
    } else {
      return;
    }
  };

  const filteredContent = persons.filter((elem) => elem.name.includes(filter));
  const personsToDisplay = filter === "" ? persons : filteredContent;

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification
        message={notification}
        notificationStyle={notificationStyle}
      />
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
      <PhonebookDisplay
        persons={personsToDisplay}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
