import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
    profileImage: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
