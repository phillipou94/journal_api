const express = require('express');
const journalController = require('../../controllers/journal.controller');
const { authenticateUser } = require('../../middlewares/auth');

const router = express.Router();

router.post('/', authenticateUser(), journalController.createJournal);
router.post('/notion', authenticateUser(), journalController.createJournalFromNotionDb);
router.get('/:userId', authenticateUser(), journalController.getJournalsForUser);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Answer
 *   description: A user's answers to their prompts

*/
