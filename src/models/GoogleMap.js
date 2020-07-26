const mongoose = require('mongoose');

const googleMapSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    locationCoordinates: {
        type: String,
        required: true,
        trim: true
    },
    label: {
        type: String
    },
    locationImage: {
        type: String
    }
},
    { timestamps: true });

const GoogleMap = mongoose.model('GoogleMap', googleMapSchema);

module.exports = GoogleMap;