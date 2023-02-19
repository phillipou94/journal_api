const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { promptService } = require('../services');
const pick = require('../utils/pick');

const createPrompt = catchAsync(async (req, res) => {
  const prompt = await promptService.createPrompt(req.body);
  res.status(httpStatus.CREATED).send(prompt);
});

const getPromptsForUser = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await promptService.queryPrompts(filter, options);
  res.send(result);
});

module.exports = {
  createPrompt,
  getPromptsForUser,
};
