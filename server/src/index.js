const express = require('express')

const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config();

const middlewares = require("./middlewares")
const logs = require("./routes/logs.routes.js")
const app = express();

const DATABASE_CONNECTION = process.env.DATABASE_URL;

mongoose.connect(DATABASE_CONNECTION, {
    UseNewUrlParser: true,
    // newUnifiedTopology: true,
});

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Hello There',
    });
});

app.use("/api/logs", logs);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Currently Listening at http://localhost:${port}`);
});