import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now, // 기본값
    },

});

export default mongoose.model('members', memberSchema);