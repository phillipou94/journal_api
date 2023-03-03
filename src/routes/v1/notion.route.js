const express = require('express');
const { authenticateUser } = require('../../middlewares/auth');
const notionController = require('../../controllers/notion/notion.controller');

const router = express.Router();

router.post('/', authenticateUser(), notionController.createJournalFromNotionDbId);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Notion
 *   description: A user's notion db they choose to link to

*/
