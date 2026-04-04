import { useState, useEffect } from "react";
import { Names } from "./components/Name";
import name from "./services/name";
import Notification from "./components/Notification/Notification";

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
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const [filteredPerson, setFilteredPerson] = useState([]);

  useEffect(() => {
    name.getAll().then((initialPerson) => {
      setPersons(initialPerson);
      setFilteredPerson(initialPerson);
    });
  }, []);

  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(null), 5000);
  };

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
          setPersons((prev) =>
            prev.map((p) => (p.id !== existingPerson.id ? p : response.data)),
          );

          setFilteredPerson((prev) =>
            prev.map((p) => (p.id !== existingPerson.id ? p : response.data)),
          );

          showMessage(`Updated ${response.data.name}`, "success");

          setNewName("");
          setNewNumber("");
        })
        .catch(() => {
          showMessage(
            `Information of ${existingPerson.name} has already been removed from server`,
            "error",
          );

          setPersons((prev) => prev.filter((p) => p.id !== existingPerson.id));

          setFilteredPerson((prev) =>
            prev.filter((p) => p.id !== existingPerson.id),
          );
        });

      return;
    }

    const newObject = {
      name: newName,
      number: newNumber,
    };

    name.create(newObject).then((returnedPerson) => {
      setPersons((prev) => prev.concat(returnedPerson));
      setFilteredPerson((prev) => prev.concat(returnedPerson));

      showMessage(`Added ${returnedPerson.name}`, "success");

      setNewName("");
      setNewNumber("");
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
        setPersons((prev) => prev.filter((person) => person.id !== id));
        setFilteredPerson((prev) => prev.filter((person) => person.id !== id));

        showMessage(`Removed ${personName}`, "error");
      })
      .catch(() => {
        showMessage(
          `Information of ${personName} has already been removed from server`,
          "error",
        );

        setPersons((prev) => prev.filter((person) => person.id !== id));
        setFilteredPerson((prev) => prev.filter((person) => person.id !== id));
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} type={messageType} />

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
