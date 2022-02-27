const PersonsForm = (props) => {
  return (
    <form onSubmit={props.addNote}>
      <div>
        name:
        <input value={props.newName} onChange={props.handleNoteChange}></input>
      </div>
      <div>
        number:
        <input
          value={props.newNumber}
          onChange={props.handleNumberChange}
        ></input>
      </div>
      <button type="submit">add</button>
    </form>
  );
};

export default PersonsForm;
