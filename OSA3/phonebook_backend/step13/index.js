const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const Person = require("./models/person");

const app = express();

const PORT = process.env.PORT;

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

// Routes
app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((persons) => res.json(persons))
    .catch((error) => next(error));
});

// app.get("/info", (req, res, next) => {
//   Person.countDocuments({})
//     .then((count) => {
//       const time = new Date();
//       res.send(`<p>Phonebook has info for ${count} people</p><p>${time}</p>`);
//     })
//     .catch((error) => next(error));
// });

// app.get("/api/persons/:id", (req, res, next) => {
//   Person.findById(req.params.id)
//     .then((person) => {
//       if (person) {
//         res.json(person);
//       } else {
//         res.status(404).json({ error: "Person not found" });
//       }
//     })
//     .catch((error) => next(error));
// });

// app.delete("/api/persons/:id", (req, res, next) => {
//   Person.findByIdAndDelete(req.params.id)
//     .then(() => res.status(204).end())
//     .catch((error) => next(error));
// });

// app.post("/api/persons", (req, res, next) => {
//   const body = req.body;

//   if (!body.name || !body.number) {
//     return res.status(400).json({ error: "Name and number are required" });
//   }

//   const person = new Person({ name: body.name, number: body.number });

//   person
//     .save()
//     .then((saved) => res.status(201).json(saved))
//     .catch((error) => next(error));
// });

// app.put("/api/persons/:id", (req, res, next) => {
//   const { name, number } = req.body;

//   Person.findByIdAndUpdate(
//     req.params.id,
//     { name, number },
//     { new: true, runValidators: true, context: "query" },
//   )
//     .then((updated) => {
//       if (updated) {
//         res.json(updated);
//       } else {
//         res.status(404).json({ error: "Person not found" });
//       }
//     })
//     .catch((error) => next(error));
// });

// const unknownEndpoint = (req, res) => {
//   res.status(404).json({ error: "unknown endpoint" });
// };
// app.use("/api", unknownEndpoint);

// // eslint-disable-next-line no-unused-vars
// const errorHandler = (error, req, res, next) => {
//   console.error(error.message);
//   if (error.name === "CastError") {
//     return res.status(400).json({ error: "malformatted id" });
//   }
//   if (error.name === "ValidationError") {
//     return res.status(400).json({ error: error.message });
//   }
//   return res.status(500).json({ error: "internal server error" });
// };
// app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
