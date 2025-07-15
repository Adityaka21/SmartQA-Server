const mongoose = require('mongoose');

const questionsSchema = new mongoose.Schema({
    roomCode: { type: String, required: true },
    content: { type: String, required: true },
    // This should be userId from the user schema; For future reference
    user: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Questions", questionsSchema);