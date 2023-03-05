const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { entryService } = require('../services');
const pick = require('../utils/pick');

const createEntry = catchAsync(async (req, res) => {
  const entry = await entryService.createEntry(req.body);
  res.status(httpStatus.CREATED).send(entry);
});

const getEntriesForUser = catchAsync(async (req, res) => {
  const filter = pick({ user: req.params.userId });
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await entryService.queryEntries(filter, options);
  res.send(result);
});

module.exports = {
  createEntry,
  getEntriesForUser,
};
