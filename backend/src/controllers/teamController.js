const { pool } = require('../config/dbconfig');
const logger = require('../tools/logger');

async function createTeam(req, res) {
    const { accountId, teamName } = req.body;
    try {
        const queryResult = await pool.query(
            "INSERT INTO team (account_id, team_name) VALUES ($1, $2) RETURNING *",
            [accountId, teamName]
        );
        if (queryResult.rowCount != 0) {
            res.status(201).json({
                success: true,
                message: "Team created successfully!",
                data: queryResult.rows[0]
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Failed to create team.",
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

async function getTeam(req, res) {
    const { accountId } = req.params;
    try {
        const queryResult = await pool.query(
            "SELECT * FROM team WHERE account_id = $1",
            [accountId]
        );
        res.status(200).json({
            success: true,
            message: "Teams retrieved successfully!",
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

async function getMemberFromTeam(req, res) {
    const { teamId } = req.params;
    try {
        const queryResult = await pool.query(
            "SELECT account_id, member_name FROM team_members WHERE team_id = $1",
            [teamId]
        );
        res.status(200).json({
            success: true,
            message: "Members retrieved successfully!",
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

async function deleteTeam(req, res) {
    const { teamId } = req.params;
    try {
        const searchQuery = await pool.query(
            "SELECT * FROM team WHERE id = $1",
            [teamId]
        );
        if (searchQuery.rowCount != 0) {
            await pool.query(
                "DELETE FROM team WHERE id = $1",
                [teamId]
            );
            res.status(200).json({
                success: true,
                message: "Team deleted successfully!",
                data: null
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Failed to delete team. Team not found.",
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

async function updateTeam(req, res) {
    const { teamId, teamName } = req.body;
    try {
        const searchQuery = await pool.query(
            "SELECT * FROM team WHERE id = $1",
            [teamId]
        );
        if (searchQuery.rowCount != 0) {
            const queryResult = await pool.query(
                "UPDATE team SET team_name = $1 WHERE id = $2 RETURNING *",
                [teamName, teamId]
            );
            res.status(200).json({
                success: true,
                message: "Team updated successfully!",
                data: queryResult.rows[0]
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Failed to update team. Team not found.",
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

async function joinTeam(req, res) {
    const { teamId } = req.params;
    const { accountId, memberName } = req.body;
    try {
        const queryResult = await pool.query(
            "INSERT INTO team_members (team_id, account_id, member_name) VALUES ($1, $2, $3) RETURNING *",
            [teamId, accountId, memberName]
        );
        res.status(201).json({
            success: true,
            message: "Joined team successfully!",
            data: queryResult.rows[0]
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

async function leaveTeam(req, res) {
    const { teamId } = req.params;
    const { accountId } = req.body;
    try {
        const queryResult = await pool.query(
            "DELETE FROM team_members WHERE team_id = $1 AND account_id = $2 RETURNING *",
            [teamId, accountId]
        );
        if (queryResult.rowCount != 0) {
            res.status(200).json({
                success: true,
                message: "Left team successfully!",
                data: null
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Failed to leave team. Membership not found.",
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

async function kickMember(req, res) {
    const { accountId } = req.params;
    const { teamId } = req.body;
    try {
        const queryResult = await pool.query(
            "DELETE FROM team_members WHERE team_id = $1 AND account_id = $2 RETURNING *",
            [teamId, accountId]
        );
        if (queryResult.rowCount != 0) {
            res.status(200).json({
                success: true,
                message: "Member kicked successfully!",
                data: null
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Failed to kick member. Membership not found.",
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
    createTeam,
    getTeam,
    getMemberFromTeam,
    deleteTeam,
    updateTeam,
    joinTeam,
    leaveTeam,
    kickMember
};
