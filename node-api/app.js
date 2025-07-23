// app.js
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Dummy GET API
app.get('/', (req, res) => {
  res.json({ message: 'Hello from Node.js API!' });
});

// Dummy POST API
app.post('/api/data', (req, res) => {
  const { name } = req.body;
  res.json({ message: `Hello, ${name}! Your data was received.` });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
