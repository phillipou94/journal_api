const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { answerService } = require('../services');
const pick = require('../utils/pick');

const createAnswer = catchAsync(async (req, res) => {
  const answer = await answerService.createAnswer(req.body);
  res.status(httpStatus.CREATED).send(answer);
});

const getAnswersForUser = catchAsync(async (req, res) => {
  const filter = pick(req.query);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await answerService.queryAnswers(filter, options);
  res.send(result);
});

module.exports = {
  createAnswer,
  getAnswersForUser,
};
