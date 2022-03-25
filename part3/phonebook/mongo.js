const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.gwu3z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
});
const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    mongoose.connection.close();
    result.forEach((person) => {
      console.log(person);
    });
  });
}
if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    phoneNumber: process.argv[4],
  });
  person.save().then((result) => {
    console.log("note saved");
    mongoose.connection.close();
  });
}
