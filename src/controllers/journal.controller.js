const httpStatus = require('http-status');

const catchAsync = require('../utils/catchAsync');
const { journalService } = require('../services');

const createJournal = catchAsync(async (req, res) => {
  const journal = await journalService.createJournal(req.body);
  res.status(httpStatus.CREATED).send(journal);
});

const getJournalsForUser = catchAsync(async (req, res) => {
  const user = req.params.userId;
  const result = await journalService.getJournalsForUser(user);
  res.send(result);
});

module.exports = {
  createJournal,
  getJournalsForUser,
};
