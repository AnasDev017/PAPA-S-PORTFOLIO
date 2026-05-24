import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
    profileImage: {
        type: String,
        required: true
    },
    cloudinaryId: {
        type: String,
        default: null
    }
}, { timestamps: true });

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
