const express = require('express');
const router = express.Router();
const ensureAuth = require('../middleware/ensureAuth');
const { createSubject, createTask } = require('../controllers/subjectController');

router.post('/', ensureAuth, createSubject);
router.post('/:subjectId/tasks', ensureAuth, createTask);

module.exports = router;
