const express = require('express');
const reminderController = require('../controllers/reminderController');
const router = express.Router();

// Route untuk '/reminder'

// Create reminder POST '/create'
router.post('/create', reminderController.createReminder);
// Get reminder(s) by team id POST '/:teamId'
router.get('/:teamId', reminderController.getReminder);
// Delete reminder DELETE ''
router.delete('/:reminderId', reminderController.deleteReminder);
// Update reminder PUT '/update'
router.put('/update/:reminderId', reminderController.updateReminder);

module.exports = router;
