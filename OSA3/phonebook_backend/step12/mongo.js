const mongoose = require("mongoose");

// Get command-line arguments: [node, mongo.js, password, name, number]
const [, , password, name, number] = process.argv;

// Exit if no password provided
if (!password) {
  console.log("Please provide the database password as the first argument.");
  process.exit(1);
}

// Database connection string (replace <password> with the provided argument)
const url = `mongodb+srv://step12:${password}@cluster0.9hq7zwz.mongodb.net/phonebook?retryWrites=true&w=majority`;

// Define person schema and model
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});
const Person = mongoose.model("Person", personSchema);

// Connect to MongoDB
mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to MongoDB");

    // If only password is given → list all entries
    if (!name && !number) {
      return Person.find({}).then((persons) => {
        console.log("Phonebook:");
        persons.forEach((p) => console.log(`${p.name} ${p.number}`));
        mongoose.connection.close();
      });
    }
    // If name and number are given → add new entry
    else if (name && number) {
      const newPerson = new Person({ name, number });
      return newPerson.save().then(() => {
        console.log(`added ${name} number ${number} to phonebook`);
        mongoose.connection.close();
      });
    }
    // Invalid arguments
    else {
      console.log("Usage:");
      console.log("  List all:   node mongo.js <password>");
      console.log('  Add entry:  node mongo.js <password> "Name" "123-456"');
      mongoose.connection.close();
    }
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  });
