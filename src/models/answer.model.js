const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { answerTypes } = require('../config/tokens');

const answerSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    prompt: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Prompt',
      required: true,
    },
    free_response_answer: {
      type: String,
    },
    category_answer: {
      type: String,
    },
    score_answer: {
      type: Number,
    },
    keywords: {
      type: [String],
    },
    type: {
      type: String,
      enum: [answerTypes.CATEGORY, answerTypes.SCORE, answerTypes.FREE_RESPONSE],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
answerSchema.plugin(toJSON);
answerSchema.plugin(paginate);

/**
 * @typedef Answer
 */
const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;
