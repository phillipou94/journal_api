const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const { journalService, notionService, notionAPIService } = require('../../services');
const { journalSourceTypes } = require('../../config/journals');
const { answerTypes } = require('../../config/answers');
const { notionPropertyTypes } = require('../../config/notion');

/**
 * Takes a notion response and returns a list of prompt bodies
 * @param {Object} notionBody
 * @returns {Object}}
 */
const parsePromptsFromNotionResponse = (notionDbItems) => {
  if (notionDbItems !== undefined || notionDbItems.length > 0) {
    const prompts = new Set();
    const defaultNotionPageProperties = ['Tags', 'Created', 'Name'];
    notionDbItems.forEach((item) => {
      const properties = Object.getOwnPropertyNames(item.properties);
      // filter out default notion page properties
      const customProperties = properties.filter(function (property) {
        return !defaultNotionPageProperties.includes(property);
      });
      customProperties.forEach((customProperty) => prompts.add(customProperty));
    });

    return prompts;
  }
  return [];
};

const translateNotionPropertyTypeToAnswer = (notionPropertyType) => {
  if (
    [
      notionPropertyTypes.SELECT,
      notionPropertyTypes.MULTI_SELECT,
      notionPropertyTypes.CHECKBOX,
      notionPropertyTypes.STATUS,
    ].includes(notionPropertyType)
  ) {
    return answerTypes.CATEGORY;
  }
  if ([notionPropertyTypes.NUMBER].includes(notionPropertyType)) {
    return answerTypes.SCORE;
  }
  if ([notionPropertyTypes.RICH_TEXT].includes(notionPropertyType)) {
    return answerTypes.FREE_RESPONSE;
  }
  return answerTypes.NOT_SUPPORTED;
}

const parseAnswersFromNotionResponse = (notionDbItems, prompts) => {
  const answers = [];
  notionDbItems.forEach((item) => {
    const properties = Object.getOwnPropertyNames(item.properties);
    // filter out default notion page properties
    prompts.forEach((prompt) => {
      const answerObject = item.properties[prompt];
      const notionAnswerType = answerObject.type;
      const answer = answerObject[notionAnswerType];
      const answerBody = {
        type: translateNotionPropertyTypeToAnswer(notionAnswerType),
        notion_property_id: answerObject.id,
        answer_time: item.properties.Created.created_time,
        prompt,
      }

      if (answerBody.type === answerTypes.CATEGORY) {
        answerBody.category_answer = answer != null ? answer.name : null;
        answerBody.notion_property_color = answer != null ? answer.color : null;
      } else if (answerBody.type === answerTypes.SCORE) {
        answerBody.score_answer = answer != null ? answer.name : null;
      } else if (answerBody.type === answerTypes.FREE_RESPONSE) {
        answerBody.free_response_answer = answer != null ? answer.name : null;
      }
      answers.push(answerBody);

    });

    // TODO: refactor to JournalEntries (each day is a new entry). Journal Entries have prompts (prompts have ansswers).
    // Index hash of question. Use notion_property_id if it's a notion doc

    /**  Answers
     *
     * {
          type: 'AnswerType.Category',
          notion_property_id: 'DGt%5C',
          answer_time: '2023-02-06T05:00:00.000Z',
          prompt: 'How happy do you feel today?',
          category_answer: null
        },
        {
          type: 'AnswerType.Category',
          notion_property_id: 'vNjf',
          answer_time: '2023-02-06T05:00:00.000Z',
          prompt: 'How confident do you feel?',
          category_answer: null
        },

     */
    /**
     * properties: {
        Tags: { id: "!'(w", type: 'multi_select', multi_select: [Array] },
        'How happy do you feel today?': { id: 'DGt%5C', type: 'select', select: [Object] },
        'How confident do you feel?': { id: 'vNjf', type: 'select', select: [Object] },
        'How anxious do you feel?': { id: 'zFjf', type: 'select', select: [Object] },
        Created: {
          id: '%7D%25j%7B',
          type: 'created_time',
          created_time: '2023-02-24T05:00:00.000Z'
        },
        'What else do you feel?': { id: '%7DdGC', type: 'select', select: [Object] },
        Name: { id: 'title', type: 'title', title: [Array] }
  },
     */
  });

};

const createJournalFromNotionDbId = catchAsync(async (req, res) => {
  const notionDbId = req.body.notion_db_id;
  const journalId = req.body.journal;
  const userId = req.body.user;

  const notionResponse = await notionAPIService.getNotionDbObject(notionDbId);
  const { results } = notionResponse;
  const prompts = parsePromptsFromNotionResponse(results);
  const answers = parseAnswersFromNotionResponse(results, prompts);
  // TODO: Create prompts
  // TODO: Create Answers


  const validNotionDB = results !== undefined;
  if (validNotionDB) {
    const notionBody = {
      notion_db_id: notionDbId,
      journal: journalId,
    };

    const journalTitle = `NOTION JOURNAL: ${notionDbId}`;
    const journalBody = {
      name: journalTitle,
      source: journalSourceTypes.NOTION,
      user: userId,
    };
    try {
      const journalServiceResponse = await journalService.createJournal(journalBody);
      const notionServiceResponse = await notionService.createNotionDb(notionBody);

      res.send({ notionServiceResponse, journalServiceResponse });
    } catch (error) {
      res.status(httpStatus.PRECONDITION_FAILED).send(error);
    }
  } else {
    res.status(httpStatus.PRECONDITION_FAILED).send('Invalid Notion Db');
  }
});

module.exports = {
  createJournalFromNotionDbId,
};
