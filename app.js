const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();
const mongo = require("./config/mongo-connect");
const session = require('express-session');

// Create Express app and HTTP server
const app = express();
const http = require('http').createServer(app);

// Setup Socket.IO
const { Server } = require('socket.io');
const io = new Server(http, {
  cors: {
    origin: '*', // or your frontend URL
    methods: ['GET', 'POST']
  }
});

// Connect MongoDB
mongo.connect((err) => {
  if (err) console.log("connection failed");
  else console.log("database connected successfully");
});

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: "key",
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 3600000 }
}));

app.use(express.static(path.join(__dirname, 'public')));

// Routes
const user = require('./routes/users');
app.use('/', user);

// Pass io to chat_field route
const chatField = require('./routes/chat_field')(io);
app.use('/chat_field', chatField);

// Catch 404
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = { app, io };