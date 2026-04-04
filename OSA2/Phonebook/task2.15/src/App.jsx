import { useState, useEffect } from "react";
import { Names } from "./components/Name";
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
      {filteredPerson.map((person) => (
        <Names key={person.id} person={person} deleteName={deleteName} />
      ))}
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

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already in the phonebook. Replace the old number with the new one?`,
      );

      if (!confirmUpdate) return;

      const updatedPerson = {
        ...existingPerson,
        number: newNumber,
      };

      name
        .update(existingPerson.id, updatedPerson)
        .then((response) => {
          window.alert(`${newName}'s number updated successfully`);

          setPersons((prev) =>
            prev.map((p) => (p.id !== existingPerson.id ? p : response.data)),
          );

          setFilteredPerson((prev) =>
            prev.map((p) => (p.id !== existingPerson.id ? p : response.data)),
          );

          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          console.log("Error updating person:", error.message);
          window.alert(`Failed to update ${newName}`);
        });

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
        window.alert(`${newName} added successfully`);

        setPersons((prev) => prev.concat(returnedPersons));
        setFilteredPerson((prev) => prev.concat(returnedPersons));

        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        console.error("Error adding person:", error);
      });
  };

  const handleNewNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
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
          `Failed to delete ${personName}. It may have already been removed.`,
        );

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
