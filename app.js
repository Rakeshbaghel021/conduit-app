var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');


var tagsRouter = require('./routes/tags');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articlesRouter = require('./routes/articles');
var profileRouter = require('./routes/profile');
var userRouter = require('./routes/user');

var app = express();
 
// connect to DataBase

mongoose.connect("mongodb://localhost/conduitApi",{
 useNewUrlParser: true,
 useUnifiedTopology: true
},(err)=>{
    if(err) console.log(err);
    else console.log("connected to DataBase");
})



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/tags', tagsRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/articles', articlesRouter);
app.use('/api/v1/user' ,userRouter);
app.use('/api/v1/profiles', profileRouter)

module.exports = app;
