const express = require('express');
const teamController = require('../controllers/teamController');
const router = express.Router();

// Route untuk '/team'

// Create team POST '/create'
router.post('/create', teamController.createTeam);
// Get team by team id GET '/:teamId'
router.get('/:teamId', teamController.getTeamByTeamId);
// Get team(s) by account id GET '/account/:accountId'
router.get('/account/:accountId', teamController.getTeamByAccountId);
// Get members name from team GET '/member/:teamId'
router.get('/member/:teamId', teamController.getMemberFromTeam);
// Delete team DELETE '/:teamId'
router.delete('/:teamId', teamController.deleteTeam);
// Update team PUT '/update/:teamId'
router.put('/update/:teamId', teamController.updateTeam);
// Join a team POST '/join/:teamId'
router.post('/join/:teamId', teamController.joinTeam);
// Leave a team POST '/leave/:teamId'
router.post('/leave/:teamId', teamController.leaveTeam);

module.exports = router;