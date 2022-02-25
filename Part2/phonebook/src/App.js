import { eventWrapper } from "@testing-library/user-event/dist/utils";
import { useState } from "react";

const DisplayItem = ({ name, number }) => (
  <div>
    {name} {number}
  </div>
);
const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

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
  const addNote = (event) => {
    event.preventDefault();
    if (!checkDuplicates()) {
      setPersons(persons.concat({ name: newName, number: newNumber }));
    }
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNote}>
        <input value={newFilter} onChange={handleFilterChange}></input>
        <div>
          <div>
            name:
            <input value={newName} onChange={handleNoteChange}></input>
          </div>
          <div>
            number:
            <input value={newNumber} onChange={handleNumberChange}></input>
          </div>
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>

      {persons.map((person) => (
        <DisplayItem
          key={person.name}
          name={person.name}
          number={person.number}
        />
      ))}
    </div>
  );
};

export default App;
