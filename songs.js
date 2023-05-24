const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;
const url = "mongodb://proboys777333:pritambhai@ac-rrmx7kp-shard-00-00.5kqktya.mongodb.net:27017,ac-rrmx7kp-shard-00-01.5kqktya.mongodb.net:27017,ac-rrmx7kp-shard-00-02.5kqktya.mongodb.net:27017/?ssl=true&replicaSet=atlas-67jp7r-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to Database Successfully!'))
  .catch((err) => { console.error("Error is" + err); });
//--------------------------------------------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Define a song schema
const songSchema = new mongoose.Schema({
  link: {
    type: String,
  },
});

// Create a song model
const Song = mongoose.model('Song', songSchema);

// Endpoint to handle storing song links
app.post('/song', async (req, res) => {
  try {
    const link = req.body.link;

    // Create a new song document
    const song = new Song({ link });

    // Save the song document to the database
    await song.save();

    res.status(200).json({ _Id: song._id, message: 'Song link stored successfully' });
  } catch (err) {
    console.error('Error storing song link:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Endpoint to respond with "hello"
// Endpoint to get all songs
app.get('/list', async (req, res) => {
  try {
    const songs = await Song.find();
    res.status(200).json(songs);
  } catch (err) {
    console.error('Error retrieving songs:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});



app.delete('/del1/:id', async (req, res) => {
  const fileId = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(fileId)) {
      console.error('Invalid fileId:', fileId);
      return res.status(400).send('Invalid fileId');
    }

    await Song.findOneAndDelete({ _id: fileId });
    console.log('Item deleted successfully from the database.');
    res.status(200).send('Item deleted successfully from the database.');
  } catch (error) {
    console.error('Failed to delete item from the database.', error);
    res.status(500).send('Failed to delete item from the database.');
  }
});




app.delete('/del2/:id', async (req, res) => {
  const fileId = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(fileId)) {
      console.error('Invalid fileId:', fileId);
      return res.status(400).send('Invalid fileId');
    }
    await Song.findOneAndDelete({ _id: fileId });
    console.log('Item deleted successfully from the database.');
    res.status(200).send('Item deleted successfully from the database.');
  } catch (error) {
    console.error('Failed to delete item from the database.', error);
    res.status(500).send('Failed to delete item from the database.');
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
