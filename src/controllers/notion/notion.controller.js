const httpStatus = require('http-status');
const { Client, APIErrorCode } = require('@notionhq/client');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');

/**
 * Takes a notoin db id and returns the notion db object
 * @param {String} notionDbId
 * @returns {Promise<QueryResult>}
 */
const getNotionDbObject = catchAsync(async (notionDbId) => {
  try {
    // let results = [];

    const notionClient = new Client({
      auth: process.env.NOTION_INTEGRATION_TOKEN,
    });

    return await notionClient.databases.query({
      database_id: notionDbId,
    });

    // results = [...results, ...notionResponse.results];

    // // while loop variables
    // let hasMore = notionResponse.has_more;
    // let nextCursor = notionResponse.next_cursor;

    // // keep fetching while there are more results
    // while (hasMore) {
    //   // eslint-disable-next-line no-await-in-loop
    //   const response = await notionClient.databases.query({
    //     database_id: notionDbId,
    //     start_cursor: nextCursor,
    //   });

    //   results = [...results, ...response.results];
    //   hasMore = response.has_more;
    //   nextCursor = notionResponse.next_cursor;
    // }
  } catch (error) {
    if (error.code === APIErrorCode.ObjectNotFound) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Database not found');
    } else {
      // Other error handling code
      throw new ApiError(httpStatus.BAD_REQUEST, error);
    }
  }
});

// const createJournalFromNotionDb = catchAsync(async (req, res) => {
//   const notionDbId = req.body.notion_db_id;
//   const journalId = req.body.journal;
//   const userId = req.body.user;
//   const notionResponse = await getNotionDbObject(notionDbId);
//   const { results } = notionResponse;
//   const validNotionDB = results !== undefined;
//   if (validNotionDB) {
//     const notionBody = {
//       notion_db_id: notionDbId,
//       journal: journalId,
//     };
//     const journalBody = {
//       name: 'Test Notion Journal',
//       source: journalSourceTypes.NOTION,
//       user: userId,
//     };

//     try {
//       const journal = await journalService.createJournal(journalBody);
//       const result = await notionService.createNotionDb(notionBody);
//       // TODO: CREATE JOURNAL AND CREATE NOTION DB
//       res.send(result);
//     } catch (error) {
//       res.status(httpStatus.PRECONDITION_FAILED).send();
//     }
// });

module.exports = {
  getNotionDbObject,
};
