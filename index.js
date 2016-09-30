// Application Starting Point
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const logger = require('morgan');

const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

// DB Setup
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/sandboxapi');

// App Setup
app.use(logger('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// Server Setup
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);
console.log('Server spinning on port', port);
