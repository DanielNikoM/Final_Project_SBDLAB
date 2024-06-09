const express = require('express');
const accountController = require('../controllers/accountController');
const router = express.Router();
const authenticateToken = require('../middlewares/accountMiddleware');

// Route untuk '/account'

// Login POST '/login'
router.post('/login', accountController.login);
// Register POST '/register'
router.post('/register', accountController.register);
// Delete account DELETE '/:accountId'
router.delete('/:accountId', authenticateToken, accountController.deleteAccount);
// Update account PUT '/update'
router.put('/update/:accountId', accountController.updateAccount);
// Get all account GET '/getAllAccount'
router.get('/getAllAccount', accountController.getAllAccount);

module.exports = router;
