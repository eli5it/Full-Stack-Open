const Persons = ({ persons }) => {
  return (
    <>
      {persons.map((person) => (
        <DisplayItem
          key={person.name}
          name={person.name}
          number={person.number}
        />
      ))}
    </>
  );
};

const DisplayItem = ({ name, number }) => (
  <div>
    {name} {number}
  </div>
);

export default Persons;
