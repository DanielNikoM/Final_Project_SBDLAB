const { pool } = require('../config/dbconfig');
const logger = require('../tools/logger');

async function createTeam(req, res) {
    const { title, owner_id } = req.body;
    try {
        const queryResult = await pool.query(
            "INSERT INTO team (title, owner_id) VALUES ($1, $2) RETURNING *",
            [title, owner_id]
        );
        const joinTeamQuery = await pool.query(
            "INSERT INTO account_team (team_id, account_id) VALUES ($1, $2) RETURNING *",
            [queryResult.rows[0].id, owner_id]
        )
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

async function getTeamByTeamId(req, res) {
    const { teamId } = req.params;
    try {
        const queryResult = await pool.query(
            "SELECT * FROM team WHERE id = $1",
            [teamId]
        );
        res.status(200).json({
            success: true,
            message: "Get success!",
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

async function getTeamByAccountId(req, res) {
    const { accountId } = req.params;
    try {
        const queryResult = await pool.query(
            "SELECT * FROM team WHERE id IN (SELECT team_id FROM account_team WHERE account_id = $1)",
            [accountId]
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

async function deleteTeam(req, res) {
    const { teamId } = req.params;
    try {
        const searchQuery = await pool.query(
            "SELECT * FROM team WHERE id = $1",
            [teamId]
        );
        if (searchQuery.rowCount != 0) {
            await pool.query(
                "DELETE FROM account_team WHERE team_id = $1",
                [teamId]
            );
            await pool.query(
                "DELETE FROM reminder WHERE team_id = $1",
                [teamId]
            );
            await pool.query(
                "DELETE FROM note WHERE team_id = $1",
                [teamId]
            );
            await pool.query(
                "DELETE FROM team WHERE id = $1",
                [teamId]
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
                message: "Delete failed! team not found!",
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
    const { title, owner_id } = req.body;
    const { teamId } = req.params;
    try {
        const searchQuery = await pool.query(
            "SELECT * FROM team WHERE id = $1",
            [teamId]
        );
        if (searchQuery.rowCount != 0) {
            const queryResult = await pool.query(
                "UPDATE team SET title = $1, owner_id = $2 WHERE id = $3 RETURNING *",
                [title, owner_id, teamId]
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
                message: "Update failed! team not found!",
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

async function getMemberFromTeam(req, res) {
    const teamId = req.params;
    try {
        const queryResult = await pool.query(
            "SELECT account_id FROM account_team WHERE team_id = $1",
            [teamId]
        );
        res.status(200).json({
            success: true,
            message: "Get Success!",
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

async function joinTeam(req, res) {
    const teamId = req.params;
    const account_id = req.body;
    try {
        const queryResult = await pool.query(
            "INSERT INTO account_team (team_id, account_id) VALUES ($1, $2) RETURNING *",
            [teamId, account_id]
        );
        if (queryResult.rowCount != 0) {
            
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
    const { accountId } = req.body;

    try {
        const searchTeam = await pool.query(
            'SELECT * FROM team WHERE id = $1',
            [teamId]
        );
        if (searchTeam.rowCount != 0) {
            const searchUser = await pool.query(
                'SELECT * FROM account WHERE id = $1',
                [accountId]
            );
            if (searchUser.rowCount != 0) {
                const checkJoin = await pool.query(
                    'SELECT * FROM account_team WHERE account_id = $1 AND team_id = $2',
                    [accountId, teamId]
                );
                if (checkJoin.rowCount === 0) {
                    const queryResult = await pool.query(
                        'INSERT INTO account_team (account_id, team_id) VALUES ($1, $2) RETURNING *',
                        [accountId, teamId]
                    );
                    res.status(200).json({
                        success: true,
                        message: "Join team success!",
                        data: queryResult.rows[0]
                    });
                }
                else {
                    res.status(200).json({
                        success: false,
                        message: "Join team failed! Already joined",
                        data: null
                    });
                }
            }
            else {
                res.status(200).json({
                    success: false,
                    message: "Join team failed! Account not found!",
                    data: null
                });
            }
        }
        else {
            res.status(200).json({
                success: false,
                message: "Join team failed! Team not found!",
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

async function leaveTeam(req, res) {
    const { teamId } = req.params;
    const { accountId } = req.body;

    try {
        const searchTeam = await pool.query(
            'SELECT * FROM team WHERE id = $1',
            [teamId]
        );
        if (searchTeam.rowCount != 0) {
            const searchUser = await pool.query(
                'SELECT * FROM account WHERE id = $1',
                [accountId]
            );
            if (searchUser.rowCount != 0) {
                const checkJoin = await pool.query(
                    'SELECT * FROM account_team WHERE account_id = $1 AND team_id = $2',
                    [accountId, teamId]
                );
                if (checkJoin.rowCount != 0) {
                    await pool.query(
                        'DELETE FROM account_team WHERE account_id = $1 AND team_id = $2',
                        [accountId, teamId]
                    );
                    res.status(200).json({
                        success: true,
                        message: "Leave team success!",
                        data: null
                    });
                }
                else {
                    res.status(200).json({
                        success: false,
                        message: "Leave team failed! Account not in the team",
                        data: null
                    });
                }
            }
            else {
                res.status(200).json({
                    success: false,
                    message: "Leave team failed! Account not found!",
                    data: null
                });
            }
        }
        else {
            res.status(200).json({
                success: false,
                message: "Leave team failed! Team not found!",
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

async function getAllTeams(req, res) {
    try {
        const queryResult = await pool.query(
            "SELECT * FROM team"
        );
        res.status(200).json({
            success: true,
            message: "Get all teams success!",
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

module.exports = {
    createTeam,
    getTeamByTeamId,
    getTeamByAccountId,
    deleteTeam,
    updateTeam,
    getMemberFromTeam,
    joinTeam,
    leaveTeam,
    getAllTeams
}