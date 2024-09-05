import mongoose, { mongo } from 'mongoose';

const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
      },
});

const User = mongoose.model("User", userSchema);

export default User;