const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./src/tools/logger');
const loggingMidware = require('./src/middlewares/loggingMiddleware');
const { databaseConnectionTest } = require('./src/config/dbconfig');

const accountRoute = require('./src/routes/accountRoute');
const teamRoute = require('./src/routes/teamRoute');
const noteRoute = require('./src/routes/noteRoute');
const reminderRoute = require('./src/routes/reminderRoute');
const cors = require('cors');

const app = express();
app.use(loggingMidware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

databaseConnectionTest();

app.use('/account', accountRoute);
app.use('/team', teamRoute);
app.use('/note', noteRoute);
app.use('/reminder', reminderRoute);

app.listen(3000, () => {
    logger.info("Server is running and listening on port 3000");
});