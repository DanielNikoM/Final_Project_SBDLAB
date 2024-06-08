const { pool } = require('../config/dbconfig');
const logger = require('../tools/logger');

async function createReminder(req, res) {
    const { team_id, title, body, reminded_at } = req.body;
    try {
        const queryResult = await pool.query(
            "INSERT INTO reminder (team_id, title, body, reminded_at) VALUES ($1, $2, $3, $4) RETURNING *",
            [team_id, title, body, reminded_at]
        );
        if (queryResult.rowCount != 0) {
            res.status(201).json({
                success: true,
                message: "Create success!",
                data: queryResult.rows[0]
            });
        }
        else {
            res.status(200).json({
                success: false,
                message: "Create failed!",
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

async function getReminder(req, res) {
    const { teamId } = req.params;
    try {
        const queryResult = await pool.query(
            "SELECT * FROM reminder WHERE team_id = $1",
            [teamId]
        );
        res.status(200).json({
            success: true,
            message: "Get success!",
            data: queryResult.rows
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

async function deleteReminder(req, res) {
    const { reminderId } = req.params;
    try {
        const searchQuery = await pool.query(
            "SELECT * FROM reminder WHERE id = $1",
            [reminderId]
        );
        if (searchQuery.rowCount != 0) {
            await pool.query(
                "DELETE FROM reminder WHERE id = $1",
                [reminderId]
            );
            res.status(200).json({
                success: true,
                message: "Delete success!",
                data: null
            });
        }
        else {
            res.status(200).json({
                success: false,
                message: "Delete failed! reminder not found!",
                data: null
            });
        }
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            data: null
        });
    }
}

async function updateReminder(req, res) {
    const { title, body, reminded_at, status } = req.body;
    const { reminderId } = req.params;
    try {
        const searchQuery = await pool.query(
            "SELECT * FROM reminder WHERE id = $1",
            [reminderId]
        );
        if (searchQuery.rowCount != 0) {
            const queryResult = await pool.query(
                "UPDATE reminder SET title = $1, body = $2, reminded_at = $3, status = $4 WHERE id = $5 RETURNING *",
                [title, body, reminded_at, status, reminderId]
            );
            res.status(200).json({
                success: true,
                message: "Update success!",
                data: queryResult.rows[0]
            });
        }
        else {
            res.status(200).json({
                success: false,
                message: "Update failed! reminder not found!",
                data: null
            });
        }
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            data: null
        });
    }
}

module.exports = {
    createReminder,
    getReminder,
    deleteReminder,
    updateReminder
}