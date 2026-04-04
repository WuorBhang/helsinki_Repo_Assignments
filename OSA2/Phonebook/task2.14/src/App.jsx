import { useState, useEffect } from "react";
import { Names } from "./components/Name";
// import axios from "axios";
import name from "./services/name";

const Filter = ({ searchPerson, handleSearchChange }) => {
  return (
    <div>
      filter shown with:{" "}
      <input value={searchPerson} onChange={handleSearchChange} />
    </div>
  );
};

const PersonForm = ({
  addName,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Person = ({ filteredPerson, deleteName }) => {
  return (
    <div>
      {filteredPerson.map((person) => {
        return (
          <Names key={person.id} person={person} deleteName={deleteName} />
        );
      })}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchPerson, setSearchPerson] = useState("");
  const [filteredPerson, setFilteredPerson] = useState([]);

  const Hook = () => {
    console.log("effect");
    name
      .getAll()
      .then((initialPerson) => {
        console.log("promise fulfilled");
        setPersons(initialPerson);
        setFilteredPerson(initialPerson);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(Hook, []);
  console.log("render", persons.length, "persons");

  const addName = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);

    const nameExists = persons.some((person) => person.name === newName);
    const numberExists = persons.some((person) => person.number === newNumber);

    if (nameExists) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      return;
    }

    if (numberExists) {
      alert(
        `The Number ${newNumber} already exists in phonebook with name 
        ${persons.find((person) => person.number === newNumber).name}`,
      );
      setNewNumber("");
      return;
    }

    const newObject = {
      id: Date.now(),
      name: newName,
      number: newNumber,
    };

    name
      .create(newObject)
      .then((returnedPersons) => {
        console.log(returnedPersons);
        setPersons(persons.concat(returnedPersons));
        setFilteredPerson(filteredPerson.concat(returnedPersons));
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        console.error("Error adding person:", error);
      });
  };

  const handleNewNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNewNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    console.log(event.target.value);
    setSearchPerson(event.target.value);
  };

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setSearchPerson(event.target.value);

    const filtered = persons.filter((person) =>
      person.name.toLowerCase().includes(event.target.value.toLowerCase()),
    );
    setFilteredPerson(filtered);
  };

  const deleteName = (id, personName) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${personName}?`,
    );

    if (!confirmDelete) return;

    name
      .remove(id)
      .then(() => {
        window.alert(
          `${personName} has been deleted successfully from the phonebook.`,
        );

        setPersons((prev) => prev.filter((person) => person.id !== id));
        setFilteredPerson((prev) => prev.filter((person) => person.id !== id));
      })
      .catch((error) => {
        console.log("Error deleting person:", error.message);
        window.alert(
          `Failed to delete ${personName}. It has already been removed from the server.`,
        );

        // Remove the person from the state even if the server deletion fails
        setPersons((prev) => prev.filter((person) => person.id !== id));
        setFilteredPerson((prev) => prev.filter((person) => person.id !== id));
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        searchPerson={searchPerson}
        handleSearchChange={handleFilterChange}
      />

      <h3>Add a new</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNewNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNewNumberChange}
      />

      <h3>Numbers</h3>
      <Person filteredPerson={filteredPerson} deleteName={deleteName} />
    </div>
  );
};

export default App;
