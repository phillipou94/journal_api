const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

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
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

// add plugin that converts mongoose to json
promptSchema.plugin(toJSON);
promptSchema.plugin(paginate);

/**
 * @typedef Prompt
 */
const Prompt = mongoose.model('Prompt', promptSchema);

module.exports = Prompt;
