const express = require('express');
const accountController = require('../controllers/accountController');
const router = express.Router();

// Route untuk '/account'

// Login POST '/login'
router.post('/login', accountController.login);
// Register POST '/register'
router.post('/register', accountController.register);
// Delete account DELETE '/:accountId'
router.delete('/:accountId', accountController.deleteAccount);
// Update account PUT '/update'
router.put('/update/:accountId', accountController.updateAccount);

module.exports = router;
