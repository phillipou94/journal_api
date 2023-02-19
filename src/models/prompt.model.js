const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const promptSchema = mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
promptSchema.plugin(toJSON);

/**
 * @typedef Prompt
 */
const Prompt = mongoose.model('Prompt', promptSchema);

module.exports = Prompt;