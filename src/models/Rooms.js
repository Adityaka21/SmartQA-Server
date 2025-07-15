const mongoose = require('mongoose');

const roomsSchema = new mongoose.Schema({
    roomCode: { type: String, required: true, unique: true },
    // This should reference to User objectId
    createdBy: { type: String},
    // Can be used in the future to delete inactive rooms
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Rooms", roomsSchema);