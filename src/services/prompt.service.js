const { Prompt } = require('../models');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<Prompt>}
 */
const createPrompt = async (promptBody) => {
  return Prompt.create(promptBody);
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
const queryPrompts = async (filter, options) => {
  const users = await Prompt.paginate(filter, options);
  return users;
};

module.exports = {
  createPrompt,
  queryPrompts,
};
