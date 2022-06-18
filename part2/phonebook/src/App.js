import { useState, useEffect } from "react";
import axios from "axios";
import personService from "./services/Persons";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((data) => setPersons(data));
  }, []);

  const addPerson = (e) => {
    e.preventDefault();

    if (verifyDuplicate()) return;

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    personService
      .create(newPerson)
      .then((data) => {
        setPersons(persons.concat(data));
        setNewName("");
        setNewNumber("");
      })
      .catch((e) => alert(`There was an error: ${e.message}`));
  };

  const verifyDuplicate = () => {
    const duplicate = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (!duplicate) return false;

    const msg =
      duplicate.name +
      " is already added to phonebook, " +
      "replace the old number with a new one?";

    if (window.confirm(msg)) {
      const updatedPerson = {
        ...duplicate,
        number: newNumber,
      };

      personService
        .updateNumber(updatedPerson)
        .then((data) =>
          setPersons(
            persons.map((person) => (person.id !== data.id ? person : data))
          )
        );
    }
    return true;
  };

  const deletePerson = (person) => () => {
    if (window.confirm(`Delete ${person.name}`)) {
      personService
        .deletePerson(person.id)
        .then((data) => setPersons(persons.filter((p) => person.id !== p.id)))
        .catch((e) => "Error deleting user");
    }
  };

  const handleNameChange = (e) => setNewName(e.target.value);
  const handleNumberChange = (e) => setNewNumber(e.target.value);
  const handleFilterChange = (e) => setFilter(e.target.value);

  const personsShown = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />

      <h2>add a new</h2>
      <PersonForm
        name={{ value: newName, onChange: handleNameChange }}
        number={{ value: newNumber, onChange: handleNumberChange }}
        onSubmit={addPerson}
      />

      <h2>Numbers</h2>
      <Persons persons={personsShown} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
