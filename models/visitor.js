const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const visitorSchema = new Schema(
  {
    ipAddress: {
      type: String,
      required: true
    },
    device: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true
  }
);

const schema = mongoose.model('Visitor', visitorSchema);

module.exports = schema;
