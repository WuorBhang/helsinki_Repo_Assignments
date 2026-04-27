const express = require('express');
const app = express();

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

app.get('/info', (req, res) => {
    const count = persons.length;
    const time = new Date();
    res.send(`<p>Phonebook has info for ${count} people</p><p>${time}</p>`);
});

app.get('/api/persons/:id', (req, res) => {
    const person = persons.find(p => p.id === req.params.id);
    if (person) {
        res.json(person);
    } else {
        res.status(404).json({ error: 'Person not found' });
    }
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
});