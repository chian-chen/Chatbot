import mongoose from 'mongoose';

const Schema = mongoose.Schema;
// Creating a schema, sort of like working with an ORM
const MessageSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required.'],
    default: 'user'
  },
  body: {
    type: mongoose.Mixed,
    required: [true, 'Body field is required.']
  }
});

// Creating a table within database with the defined schema

const Message = mongoose.model('message', MessageSchema);

// Exporting table for querying and mutating

export default Message;