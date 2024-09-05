import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true, 
  },
  attendees: [
    {
      name: String,
      email: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Session = mongoose.model('Session', sessionSchema);
export default Session;
