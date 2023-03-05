const { Entry } = require('../models');

/**
 * Create an Entry
 * @param {Object} entryBody
 * @returns {Promise<Entry>}
 */
const createEntry = async (entryBody) => {
  return Entry.create(entryBody);
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
const queryEntries = async (filter, options) => {
  const users = await Entry.paginate(filter, options);
  return users;
};

module.exports = {
  createEntry,
  queryEntries,
};
