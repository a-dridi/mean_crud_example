import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Tasks = new Schema({
    title: {
        type: String,
        required: [true, "Please enter a task title"]
    },
    description: {
        type: String 
    },
    priority: {
        type: Number,
        default: 0
    }
});

export default mongoose.model('Tasks', Tasks);