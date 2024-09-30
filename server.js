const express = require('express');
const path = require('path');
const { Storage } = require('@google-cloud/storage');
const app = express();

// Initialize Google Cloud Storage client
const storage = new Storage();
const bucketName = process.env.GCS_BUCKET || 'dalquint-cdn-bucket';
const cdnBaseUrl = process.env.CDN_BASE_URL || 'https://your-cdn-url.com'; // Set your CDN base URL

// Set up EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API route to list all files in the bucket
app.get('/api/files', async (req, res) => {
  try {
    const [files] = await storage.bucket(bucketName).getFiles();
    const imageFiles = [];
    const videoFiles = [];

    // Loop through the files and categorize them based on the extension
    files.forEach(file => {
      const fileName = file.name;
      if (/\.(jpg|jpeg|png|gif)$/i.test(fileName)) {
        imageFiles.push(`${cdnBaseUrl}/${fileName}`);
      } else if (/\.(mp4|webm|ogg)$/i.test(fileName)) {
        videoFiles.push(`${cdnBaseUrl}/${fileName}`);
      }
    });

    // Return the list of files to the client as JSON
    res.json({ images: imageFiles, videos: videoFiles });
  } catch (error) {
    console.error('Error fetching files from bucket:', error);
    res.status(500).json({ error: 'Unable to fetch files from the bucket' });
  }
});

// Serve the main page
app.get('/', (req, res) => {
  res.render('index', { cdnBaseUrl });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);  
});
