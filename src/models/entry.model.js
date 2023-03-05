const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { answerTypes } = require('../config/answers');

const promptSchema = mongoose.Schema({
  question: {
    type: String,
    required: true,
    index: true,
  },
  type: {
    type: String,
    enum: [answerTypes.CATEGORY, answerTypes.SCORE, answerTypes.FREE_RESPONSE],
    required: true,
  },
  answer: {
    type: mongoose.Schema.Types.Mixed,
    required: [
      function () {
        return this.question !== undefined || this.question !== null;
      },
      'category_answer is required for type category',
    ],
  },
});

const entrySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    journal: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Journal',
      required: true,
    },
    date: { type: Date, default: Date.now },
    prompts: {
      type: [promptSchema],
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

// add plugin that converts mongoose to json
entrySchema.plugin(toJSON);
entrySchema.plugin(paginate);

/**
 * @typedef Entry
 */
const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;
