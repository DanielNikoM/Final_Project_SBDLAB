const { pool } = require('../config/dbconfig');
const { hashThis } = require('../tools/hasher');
const logger = require('../tools/logger');

function validateEmail(input) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (input.match(validRegex)) return true;
    return false;
}

async function login(req, res) {
    const { email, password } = req.body;
    const hashedPassword = hashThis(password);
    try {
        // Check for account
        const queryResult = await pool.query(
            "SELECT * FROM account WHERE email = $1 AND password = $2",
            [email, hashedPassword]
        );
        // If found, send the account data
        // else send nothing
        if (queryResult.rowCount != 0) {
            res.status(200).json({
                success: true,
                message: "Login Success!",
                data: queryResult.rows[0]
            });
        }
        else {
            res.status(200).json({
                success: false,
                message: "Login Failed! Wrong email or password!",
                data: null
            });
        }
    }
    catch (error) {
        logger.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            data: null
        });
    }
}

async function register(req, res) {
    const { name, email, password } = req.body;
    if (!validateEmail(email)) {
        res.status(200).json({
            success: false,
            message: "Register Failed! Email not valid!",
            data: null
        });
    }
    const hashedPassword = hashThis(password);
    try {
        // Check for account with the same email
        const queryResult = await pool.query(
            "SELECT * FROM account WHERE email = $1",
            [email]
        );
        // If found then fail
        // else then successfully register
        if (queryResult.rowCount != 0) {
            res.status(200).json({
                success: false,
                message: "Register Failed! Account already created!",
                data: null
            });
        }
        else {
            registerResult = await pool.query(
                "INSERT INTO account (name, email, password) VALUES ($1, $2, $3)",
                [name, email, hashedPassword]
            );
            res.status(201).json({
                success: true,
                message: "Register Success!",
                data: null
            });
        }
    }
    catch (error) {
        logger.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            data: null
        });
    }
}

async function updateAccount(req, res) {
    const { name, email, password } = req.body;
    const { accountId } = req.params;
    const hashedPassword = hashThis(password);
    try {
        // Check for account
        const queryResult = await pool.query(
            "SELECT * FROM account WHERE id = $1",
            [accountId]
        );
        // If found then update the account
        // else then fail
        if (queryResult.rowCount != 0) {
            const updateResult = await pool.query(
                "UPDATE account SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *",
                [name, email, hashedPassword, accountId]
            );
            res.status(200).json({
                success: true,
                message: "Update Success!",
                data: updateResult.rows[0]
            });
        }
        else {
            res.status(200).json({
                success: false,
                message: "Update Failed! Account not found!",
                data: null
            });
        }
    }
    catch (error) {
        logger.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            data: null
        });
    }
}

async function deleteAccount(req, res) {
    const { password } = req.body;
    const { accountId } = req.params;
    const hashedPassword = hashThis(password);
    try {
        // Check for account
        const searchQuery = await pool.query(
            "SELECT * FROM account WHERE id = $1 AND password = $2",
            [accountId, hashedPassword]
        );
        // if not found then fail
        // else delete
        if (searchQuery.rowCount === 0) {
            res.status(200).json({
                success: false,
                message: "Delete Failed! Account not found or wrong password!",
                data: null
            });
        }
        else {
            // remove from every joined team
            await pool.query(
                "DELETE FROM account_team WHERE account_id = $1",
                [accountId]
            );
            // find owned team
            const teamsId = await pool.query(
                "SELECT id FROM team WHERE owner_id = $1"
                [accountId]
            );
            for (let i = teamsId.rowCount; i > 0; i--) {
                // delete note from the owned team
                await pool.query(
                    "DELETE FROM note WHERE team_id = $1",
                    [teamsId.rows[i-1]]
                );
                // delete reminder from the owned team
                await pool.query(
                    "DELETE FROM reminder WHERE team_id = $1",
                    [teamsId.rows[i-1]]
                );
                // remove member from the owned team
                await pool.query(
                    "DELETE FROM account_team WHERE team_id = $1",
                    [teamsId.rows[i-1]]
                );
                // delete owned team
                await pool.query(
                    "DELETE FROM team WHERE id = $1",
                    [teamsId.rows[i-1]]
                );
            }
            // remove account
            await pool.query(
                "DELETE FROM account WHERE id = $1",
                [accountId]
            );
            res.status(200).json({
                success: true,
                message: "Delete success!",
                data: null
            });
        }
    }
    catch (error) {
        logger.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            data: null
        });
    }
}

module.exports = {
    login,
    register,
    updateAccount,
    deleteAccount
}