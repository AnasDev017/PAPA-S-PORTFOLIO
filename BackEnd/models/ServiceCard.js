import mongoose from 'mongoose';

const serviceCardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    cloudinaryId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const ServiceCard = mongoose.model('ServiceCard', serviceCardSchema);

export default ServiceCard;
