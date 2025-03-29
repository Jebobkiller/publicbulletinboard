const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// In-memory database for demo purposes
// In a real app, you would use a proper database like MongoDB or PostgreSQL
let notes = [];

// Get all notes
app.get('/notes', (req, res) => {
  res.json(notes);
});

// Add a new note
app.post('/notes', (req, res) => {
  const { content, nickname } = req.body;
  if (content) {
    const newNote = { content, nickname, timestamp: new Date().toISOString() };
    notes.unshift(newNote);
    res.status(201).json(newNote);
  } else {
    res.status(400).json({ error: 'Note content is required' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});