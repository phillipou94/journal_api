const { Answer } = require('../models');

/**
 * Create a user
 * @param {Object} answerBody
 * @returns {Promise<Answer>}
 */
const createAnswer = async (answerBody) => {
  return Answer.create(answerBody);
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
const queryAnswers = async (filter, options) => {
  const users = await Answer.paginate(filter, options);
  return users;
};

module.exports = {
  createAnswer,
  queryAnswers,
};
