const mongoose = require('mongoose');

const FavupSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    posterId:{
        type:String,
        required:true
    },
    poster: {
        type: String,
        required: true,
    },
    postId: {
        type: String,
        required: true,
    },
    postCaption: {
        type: String,
        required: true
    },
    postImage: {
        type: String,
        required: true
    }
});

FavupSchema.index({ username: 1, postId: 1 }, { unique: true });

const Favouriteup = mongoose.model('Favouriteup', FavupSchema);

module.exports = Favouriteup;
