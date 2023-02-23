const express = require('express');
const promptController = require('../../controllers/prompt.controller');
const { authenticateUser } = require('../../middlewares/auth');

const router = express.Router();

router.route('/').post(authenticateUser(), promptController.createPrompt);
router.route('/:userId').get(promptController.getPromptsForUser);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Prompt
 *   description: A user's prompts for their journal

*/
