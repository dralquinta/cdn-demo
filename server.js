// server.js

const express = require('express');
const path = require('path');
const app = express();

// Set up templating engine (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));   

// CDN base URL (replace with your actual CDN URL)
const cdnBaseUrl = process.env.CDN_BASE_URL || 'https://your-default-cdn-url.com';

app.get('/', (req, res) => {
  res.render('index', { cdnBaseUrl }); // Pass only the CDN base URL to the template
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});