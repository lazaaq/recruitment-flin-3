// index.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3003;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Dummy user (replace this with a real DB in production)
const user = {
    id: 1,
    username: 'admin',
    password: bcrypt.hashSync('password123', 10), // Hashed password
};
// Read leads from file leads.json
const leadsFilePath = path.join(__dirname, 'leads.json');
const readLeads = () => {
    if (!fs.existsSync(leadsFilePath)) {
      fs.writeFileSync(leadsFilePath, JSON.stringify([]));
    }
    const data = fs.readFileSync(leadsFilePath);
    return JSON.parse(data);
};
const writeLeads = (leads) => {
    fs.writeFileSync(leadsFilePath, JSON.stringify(leads, null, 2));
};

const JWT_SECRET = 'your_jwt_secret_key';

// Login route - generates token
app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    // Check if username exists
    if (username !== user.username) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
  
    // Validate password
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
  
    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
  
    res.json({ token });
});

// Middleware Authentication using JWT
const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
  
    if (!token) return res.status(401).json({ message: 'Token missing' });
  
    jwt.verify(token, JWT_SECRET, (err, userData) => {
      if (err) return res.status(403).json({ message: 'Invalid token' });
  
      req.user = userData;
      next();
    });
};

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Protected API route
app.get('/leads', authenticate, (req, res) => {
    const leads = readLeads();
    res.json(leads);
});

app.post('/leads', authenticate, (req, res) => {
    const { name, phone, email, loanType } = req.body;

    if (!name || !phone || !email || !loanType) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const leads = readLeads();
    const newLead = {
        id: leads.length + 1,
        name,
        phone,
        email,
        loanType
    };
    leads.push(newLead);
    writeLeads(leads);
    res.status(201).json({ message: 'Lead saved to file', lead: newLead });
})


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
