const { Notion } = require('../../models');

/**
 * Create a notion db
 * @param {Object} notionBody
 * @returns {Promise<Answer>}
 */
const createNotionDb = async (notionBody) => {
  return Notion.create(notionBody);
};

/**
 * Create a notion db
 * @param {Object} notionBody
 * @returns {Promise<Answer>}
 */
const getNotionDbFromJournal = async (journalId) => {
  return Notion.findOne({ journal: journalId });
};

module.exports = {
  createNotionDb,
  getNotionDbFromJournal,
};
