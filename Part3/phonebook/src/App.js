import { eventWrapper } from "@testing-library/user-event/dist/utils";
import { useEffect, useState } from "react";
import Persons from "./components/Persons";
import PersonsForm from "./components/PersonsForm";
import Filter from "./components/Filter";
import axios from "axios";

const DisplayItem = ({ name, number }) => (
  <div>
    {name} {number}
  </div>
);
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
      setFilteredPersons(response.data);
    });
  }, []);

  const filterPerson = (name, filter) => {
    return name.slice(0, filter.length).toUpperCase() === filter.toUpperCase();
  };

  const checkDuplicates = () => {
    const containsDuplicates =
      persons.filter((person) => person.name === newName).length > 0;

    if (containsDuplicates) {
      alert(`${newName} is already added to phonebook.`);
    }
    return containsDuplicates;
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleNoteChange = (event) => {
    setNewName(event.target.value);
  };
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
    const filter = event.target.value;
    setFilteredPersons(
      persons.filter((person) => filterPerson(person.name, filter))
    );
  };
  const addNote = (event) => {
    event.preventDefault();
    if (!checkDuplicates()) {
      setPersons(persons.concat({ name: newName, number: newNumber }));
      if (filterPerson(newName, newFilter)) {
        setFilteredPersons(
          filteredPersons.concat({ name: newName, number: newNumber })
        );
      }
    }
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        newFilter={newFilter}
        handleFilterChange={handleFilterChange}
      ></Filter>

      <PersonsForm
        addNote={addNote}
        newName={newName}
        handleNoteChange={handleNoteChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      ></PersonsForm>

      <h2>Numbers</h2>
      <Persons persons={filteredPersons}></Persons>
    </div>
  );
};

export default App;
