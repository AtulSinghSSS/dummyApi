const express = require('express');
const app = express();
const sequelize = require('./config/database');
const dotenv = require('dotenv');


// Load env based on NODE_ENV
dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
  override: true
});
const PORT = process.env.PORT || 3000;

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("BASE_URL:", process.env.BASE_URL);
console.log("BASE_URL:", PORT);

 // ✅ defined properly

app.use(express.json());

const User = require('./models/User');



// Test DB Connection & Start Server
sequelize.sync({ alter: true })  // 👈 This creates/updates the table automatically
  .then(() => {
    console.log('✅ Synced DB and connected to Azure SQL');

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on ${process.env.BASE_URL}`);
    });
  })
  .catch((err) => {
    console.error('❌ Error syncing DB:', err);
  });


// Dummy GET API
app.get('/', (req, res) => {
  res.json({ message: 'Hello from Node.js API!' });
});

// Dummy POST API
app.post('/api/signUp', async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required.' });
    }

    // ✅ Insert into database
    const newUser = await User.create({ name, email });

    res.status(201).json({
      message: 'User created successfully!',
      user: newUser
    });
  } catch (err) {
    console.error('❌ Error inserting user:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.findAll(); // ✅ fetches all rows
    res.status(200).json({
      message: 'Users fetched successfully!',
      users
    });
  } catch (err) {
    console.error('❌ Error fetching users:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
