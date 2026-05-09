const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

morgan.token("body", (req) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
  return "";
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

// static frontend build
app.use(express.static("dist"));

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// Routes
app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  const count = persons.length;
  const time = new Date();
  res.send(`<p>Phonebook has info for ${count} people</p><p>${time}</p>`);
});

app.get("/api/persons/:id", (req, res) => {
  const person = persons.find((p) => p.id === req.params.id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).json({ error: "Person not found" });
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const exists = persons.some((p) => p.id === id);

  if (!exists) {
    return res.status(404).json({ error: "Person not found" });
  }

  persons = persons.filter((p) => p.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: "Name and number are required" });
  }

  const nameExists = persons.some(
    (p) => p.name.toLowerCase() === body.name.toLowerCase(),
  );

  if (nameExists) {
    return res.status(400).json({ error: "Name must be unique" });
  }

  const newPerson = {
    id: String(Math.floor(Math.random() * 1000000)),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(newPerson);
  res.status(201).json(newPerson);
});

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: "unknown endpoint" });
};

app.use("/api", unknownEndpoint);

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
