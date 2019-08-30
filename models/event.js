const  mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    price : {
        type: Number,
        required: true
    },
    date : {
        type: Date,
        required: true
    },
    creator : {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }
});

const schema = mongoose.model('Event', eventSchema);

module.exports = schema;