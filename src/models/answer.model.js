const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { answerTypes } = require('../config/answers');

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
    type: {
      type: String,
      enum: [answerTypes.CATEGORY, answerTypes.SCORE, answerTypes.FREE_RESPONSE],
      required: true,
    },
    free_response_answer: {
      type: String,
      required: [
        function () {
          return this.type === answerTypes.FREE_RESPONSE;
        },
        'free_response_answer is required for type FREE_RESPONSE',
      ],
    },
    category_answer: {
      type: String,
      required: [
        function () {
          return this.type === answerTypes.CATEGORY;
        },
        'category_answer is required for type category',
      ],
    },
    score_answer: {
      type: Number,
      required: [
        function () {
          return this.type === answerTypes.SCORE;
        },
        'score_answer is required for type score',
      ],
    },
    keywords: {
      type: [String],
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
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
