const express = require('express');
const cors = require('cors');
const admin = require('./firebase');

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'https://your-webflow-site-url.com', // Replace with your actual Webflow domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

// Use CORS middleware
app.use(cors(corsOptions));
app.use(express.json()); // Parse JSON requests

// Example route to get data from Firestore
app.get('/api/data', async (req, res) => {
  try {
    const snapshot = await admin.firestore().collection('your-collection').get();
    const results = snapshot.docs.map(doc => doc.data());
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

// Start the server (for local testing)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export the app for Vercel
module.exports = app;
