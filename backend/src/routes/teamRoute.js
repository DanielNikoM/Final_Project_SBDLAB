const express = require('express');
const teamController = require('../controllers/teamController');
const router = express.Router();

// Route untuk '/team'

// Create team POST '/create'
router.post('/create', teamController.createTeam);
// Get team(s) by account id GET '/:accountId'
router.get('/:accountId', teamController.getTeam);
// Get members name from team GET '/member/:teamId'
router.get('/member/:teamId', teamController.getMemberFromTeam);
// Delete team DELETE '/:teamId'
router.delete('/:teamId', teamController.deleteTeam);
// Update team PUT '/update'
router.put('/update', teamController.updateTeam);
// Join a team POST '/join/:teamId'
router.post('/join/:teamId', teamController.joinTeam);
// Leave a team POST '/leave/:teamId'
router.post('/leave/:teamId', teamController.leaveTeam);
// Kick a member of a team POST '/kick/:accountId'
router.post('/kick/:accountId', teamController.kickMember);

module.exports = router;
