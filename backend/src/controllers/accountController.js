const { pool } = require('../config/dbconfig');
const { hashThis } = require('../tools/hasher');
const jwt = require('jsonwebtoken');
const logger = require('../tools/logger');
require('dotenv').config();
const bcrypt = require('bcrypt');

const secretKey = process.env.ACCESS_TOKEN_SECRET;

function validateEmail(input) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (input.match(validRegex)) return true;
    return false;
}

async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password must be provided!",
            data: null
        });
    }

    try {
        const hashedPassword = hashThis(password);
        const queryResult = await pool.query(
            "SELECT * FROM account WHERE email = $1 AND password = $2",
            [email, hashedPassword]
        );

        if (queryResult.rowCount === 0) {
            return res.status(401).json({
                success: false,
                message: "Login Failed! Wrong email or password!",
                data: null
            });
        }

        const user = queryResult.rows[0];
        const accessToken = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' });

        return res.status(200).json({
            success: true,
            message: "Login Success!",
            accessToken: accessToken,
            data: user
        });
    } catch (error) {
        logger.error(error);
        return res.status(500).json({
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
        return;
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

        if (req.user.id !== accountId) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized! You can only delete your own account.",
                data: null
            });
        }
        // Check for account
        const searchQuery = await pool.query(
            "SELECT * FROM account WHERE id = $1 AND password = $2",
            [accountId, hashedPassword]
        );

        console.log('Search query result:', searchQuery.rows);

        // If not found, fail; else, proceed to delete
        if (searchQuery.rowCount === 0) {
            return res.status(200).json({
                success: false,
                message: "Delete Failed! Account not found or wrong password!",
                data: null
            });
        }

        // Remove from every joined team
        await pool.query(
            "DELETE FROM account_team WHERE account_id = $1",
            [accountId]
        );

        // Find owned teams and delete related records
        const teamsId = await pool.query(
            "SELECT id FROM team WHERE owner_id = $1",
            [accountId]
        );
        if (teamsId.rowCount !== 0) {
            for (let i = teamsId.rowCount; i > 0; i--) {
                await pool.query(
                    "DELETE FROM note WHERE team_id = $1",
                    [teamsId.rows[i - 1].id]
                );
                await pool.query(
                    "DELETE FROM reminder WHERE team_id = $1",
                    [teamsId.rows[i - 1].id]
                );
                await pool.query(
                    "DELETE FROM account_team WHERE team_id = $1",
                    [teamsId.rows[i - 1].id]
                );
                await pool.query(
                    "DELETE FROM team WHERE id = $1",
                    [teamsId.rows[i - 1].id]
                );
            }
        }

        // Remove account
        await pool.query(
            "DELETE FROM account WHERE id = $1",
            [accountId]
        );

        res.status(200).json({
            success: true,
            message: "Delete success!",
            data: null
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            data: null
        });
    }
}


async function getAllAccount(req, res) {
    try {
        const queryResult = await pool.query(
            "SELECT * FROM account"
        );
        res.status(200).json({
            success: true,
            message: "Get all account success!",
            data: queryResult.rows
        });
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
    deleteAccount,
    getAllAccount
}