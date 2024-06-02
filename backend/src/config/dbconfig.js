const { Pool } = require('pg');
const dotenv = require('dotenv');
const logger = require('../tools/logger');

dotenv.config();

const pool = new Pool({
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    ssl: {
        rejectUnauthorized: false,
        sslmode: 'require',
    },
});

async function databaseConnectionTest() {
    try {
        const client = await pool.connect();
        logger.info('Database can be connected');
        await client.end();
    } catch (error) {
        logger.error('Error connecting to database:', error);
    }
}

module.exports = {
    pool,
    databaseConnectionTest
};