const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    link: {
      type: String,
    },
    audio: {
      type: String,
    },
  });
  
  // Create a song model
  const Song = mongoose.model('Song', songSchema);

module.exports=Song