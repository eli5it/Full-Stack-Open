import { useEffect, useState } from "react";
import Persons from "./components/Persons";
import PersonsForm from "./components/PersonsForm";
import Filter from "./components/Filter";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [message, setMessage] = useState(null);
  const [notificationStyle, setNotificationStyle] = useState("success");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
      setFilteredPersons(initialPersons);
    });
  }, []);

  const filterPerson = (name, filter) => {
    return name.slice(0, filter.length).toUpperCase() === filter.toUpperCase();
  };

  const checkDuplicates = () => {
    const containsDuplicates =
      persons.filter((person) => person.name === newName).length > 0;
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

  const filterNewPerson = (newObject) => {
    if (filterPerson(newName, newFilter)) {
      setFilteredPersons(filteredPersons.concat(newObject));
    }
  };
  const updatePersonState = (personState, newPerson) => {
    return personState.map((person) =>
      person.name === newName ? newPerson : person
    );
  };
  const displayNotification = (message, style) => {
    setMessage(message);
    setNotificationStyle(style);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const addNote = (event) => {
    const newObject = { name: newName, number: newNumber };
    event.preventDefault();
    const isDuplicate = checkDuplicates();
    if (!isDuplicate) {
      personService
        .create(newObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          filterNewPerson(newObject);
          displayNotification(`${newName} Added`, "success");
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          console.log(error.responseData);
        });
    } else if (isDuplicate) {
      const message = `${newName} is already in the phonebook, replace the old number with a new one?`;
      const oldPerson = persons.find((person) => person.name === newName);
      if (window.confirm(message)) {
        personService
          .replace(newObject, oldPerson.id)
          .then((returnedPerson) => {
            displayNotification(`${returnedPerson.name} updated`);
            setPersons(updatePersonState(persons, returnedPerson));
            setFilteredPersons(
              updatePersonState(filteredPersons, returnedPerson)
            );
          })
          .catch((error) => {
            displayNotification(
              "note has already been deleted from the server",
              "failure"
            );
          });
      }
    }
  };
  const deletePerson = (name) => {
    if (window.confirm("Do you really want to delete this item?")) {
      const personToDelete = persons.find((person) => person.name === name);
      personService.deletePerson(personToDelete).then(() => {
        const updatedPersonArray = persons.filter(
          (person) => person.name !== name
        );
        setPersons(updatedPersonArray);
        const updatedFilteredPersons = filteredPersons.filter(
          (person) => person.name !== name
        );
        setFilteredPersons(updatedFilteredPersons);
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={message}
        notificationStyle={notificationStyle}
      ></Notification>
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
      <Persons
        persons={filteredPersons}
        setPersons={setPersons}
        deletePerson={deletePerson}
      ></Persons>
    </div>
  );
};

export default App;
