const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const journalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    source: {
      type: String,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

// add plugin that converts mongoose to json
journalSchema.plugin(toJSON);
journalSchema.plugin(paginate);

/**
 * @typedef Journal
 */
const Journal = mongoose.model('Journal', journalSchema);

module.exports = Journal;
