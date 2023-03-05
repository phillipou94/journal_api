const express = require('express');
const entryController = require('../../controllers/entry.controller');
const { authenticateUser } = require('../../middlewares/auth');

const router = express.Router();

router.route('/').post(authenticateUser(), entryController.createEntry);
router.route('/:userId').get(authenticateUser(), entryController.getEntriesForUser);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Prompt
 *   description: A user's prompts for their journal

*/
