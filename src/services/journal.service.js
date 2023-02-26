const { Journal } = require('../models');

/**
 * Create a user
 * @param {Object} journalBody
 * @returns {Promise<Journal>}
 */
const createJournal = async (journalBody) => {
  return Journal.create(journalBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryJournals = async (filter, options) => {
  const users = await Journal.paginate(filter, options);
  return users;
};

const getJournalsForUser = async (user) => {
  return Journal.find({ user: user });
};

module.exports = {
  createJournal,
  getJournalsForUser,
  queryJournals,
};
