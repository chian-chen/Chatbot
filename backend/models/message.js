import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  user: {
    type: String,
    required: [true, 'Name field is required.'],
  },
  from: {
    type: String,
    required: [true, 'Name field is required.'],
    default: 'user' // two options, user or bot
  },
  body: {
    type: mongoose.Mixed,
    required: [true, 'Body field is required.']
  }
});


const Message = mongoose.model('message', MessageSchema);


export default Message;