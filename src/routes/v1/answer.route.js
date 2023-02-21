const express = require('express');
const answerController = require('../../controllers/answer.controller');

const router = express.Router();

router.post('/', answerController.createAnswer);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Answer
 *   description: A user's answers to their prompts

*/
