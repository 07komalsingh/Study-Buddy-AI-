const Subject = require('../models/Subject');
const Task = require('../models/Task');

async function createSubject(req, res, next) {
  try {
    const { name, colour } = req.body;
    if (!name) return res.status(400).json({ message: 'Subject name is required.' });

    const subject = await Subject.create({ user: req.user.id, name, colour });
    return res.status(201).json({ subject });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'You already have a subject with that name.' });
    }
    next(error);
  }
}

async function createTask(req, res, next) {
  try {
    const { subjectId } = req.params; // comes from the URL now, not the body
    const { description, deadline, estimatedEffortHours, priority } = req.body;

    if (!description || !deadline || !estimatedEffortHours) {
      return res.status(400).json({ message: 'Description, deadline and effort estimate are required.' });
    }

    const subject = await Subject.findOne({ _id: subjectId, user: req.user.id });
    if (!subject) return res.status(404).json({ message: 'Subject not found.' });

    const task = await Task.create({
      user: req.user.id, subject: subjectId, description, deadline, estimatedEffortHours, priority,
    });
    return res.status(201).json({ task });
  } catch (error) {
    if (error.name === 'ValidationError') return res.status(400).json({ message: error.message });
    next(error);
  }
}

module.exports = { createSubject, createTask };
