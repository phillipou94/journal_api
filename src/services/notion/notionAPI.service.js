const { Client, APIErrorCode } = require('@notionhq/client');
const ApiError = require('../../utils/ApiError');

/**
 * Takes a notoin db id and returns the notion db object
 * @param {String} notionDbId
 * @returns {Promise<QueryResult>}
 */
const getNotionDbObject = async (notionDbId) => {
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
};

module.exports = {
  getNotionDbObject,
};
