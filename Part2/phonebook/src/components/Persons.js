const Persons = ({ persons, deletePerson }) => {
  return (
    <>
      {persons.map((person) => (
        <DisplayItem
          key={person.name}
          name={person.name}
          number={person.number}
          deletePerson={deletePerson}
        />
      ))}
    </>
  );
};

const DisplayItem = ({ name, number, deletePerson }) => {
  return (
    <div>
      {name} {number}
      <button onClick={() => deletePerson(name)}>delete</button>
    </div>
  );
};

export default Persons;
