const express = require('express');
const noteController = require('../controllers/noteController');
const router = express.Router();

// Route untuk '/note'

// Create note POST '/create'
router.post('/create', noteController.createNote);
// Get note(s) by team id POST '/:teamId'
router.get('/:teamId', noteController.getNote);
// Delete note DELETE ''
router.delete('/:noteId', noteController.deleteNote);
// Update note PUT '/update'
router.put('/update/:noteId', noteController.updateNote);

module.exports = router;
