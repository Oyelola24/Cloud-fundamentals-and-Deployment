// Simple Express server that connects to MongoDB and serves a static frontend
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

// Load configuration from environment variables
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mern_checkpoint';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API routes
const apiRouter = require('./routes/api');
app.use('/api', apiRouter);

// Serve static frontend from server/public (after client build copies files here)
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// All other routes should serve index.html so client-side routing works
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// Connect to MongoDB and start server
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
