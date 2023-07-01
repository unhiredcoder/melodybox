const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const MongoUrl = process.env.URL;
const Song = require("./db/dbschema")
mongoose.connect(MongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to Database Successfully!'))
  .catch((err) => { console.error("Error is" + err); });
//--------------------------------------------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


  // Backend API endpoint for file upload
app.post('/song/upload', async (req, res) => {
  try {
    const link = req.body.link;

    // Create a new song document
    const song = new Song({ link });

    // Save the song document to the database
    await song.save();
    res.status(200).json({song });
  } catch (err) {
    console.error('Error uploading file:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Backend API endpoint for adding a link
app.post('/song/link', async (req, res) => {
  try {
    const link = req.body.link;

    // Create a new song document
    const song = new Song({ link });

    // Save the song document to the database
    await song.save();

    res.status(200).json({song});
  } catch (err) {
    console.error('Error adding link:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint to get all songs
app.get('/list', async (req, res) => {
  try {
    const songs = await Song.find();
    res.status(200).json({songs});
  } catch (err) {
    console.error('Error retrieving songs:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.delete('/song/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // Delete the song document from the database
    await Song.findByIdAndDelete(id);

    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
