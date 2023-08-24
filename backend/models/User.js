import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  user: {
    type: String,
    required: [true, 'Name field is required.'],
    unique: true,
  }
});


const User = mongoose.model('user', UserSchema);

export default User;