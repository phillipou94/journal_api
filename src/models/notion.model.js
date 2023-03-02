const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const notionSchema = mongoose.Schema(
  {
    journal: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Journal',
      required: true,
      index: true,
    },
    notion_db_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

// add plugin that converts mongoose to json
notionSchema.plugin(toJSON);
notionSchema.plugin(paginate);

/**
 * @typedef Journal
 */
const Notion = mongoose.model('Notion', notionSchema);

module.exports = Notion;
