const tokenTypes = {
  ACCESS: 'access',
  REFRESH: 'refresh',
  RESET_PASSWORD: 'resetPassword',
  VERIFY_EMAIL: 'verifyEmail',
};

const answerTypes = {
  FREE_RESPONSE: 'AnswerType.FreeResponse',
  CATEGORY: 'AnswerType.Category',
  SCORE: 'AnswerType.Score',
};

module.exports = {
  tokenTypes,
  answerTypes,
};
