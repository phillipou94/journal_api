const express = require('express');
const promptController = require('../../controllers/prompt.controller');

const router = express.Router();

router.post('/', promptController.createPrompt);
router.route('/:userId').get(promptController.getPromptsForUser);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Prompt
 *   description: A user's prompts for their journal

*/
