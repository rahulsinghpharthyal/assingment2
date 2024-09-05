import mongoose from 'mongoose';

const availabilitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  availabilityPeriods: [
    {
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
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Availability = mongoose.model('Availability', availabilitySchema);
export default Availability;
