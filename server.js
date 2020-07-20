const express = require('express');
const path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
var schoolsRouter = require('./routes/schools');
var newsRouter = require('./routes/news');
var coursesRouter = require('./routes/courses');
var chaptersRouter = require('./routes/chapters');
var studentsRouter = require('./routes/students');
var tutorialsRouter = require('./routes/tutorials');

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/schools', schoolsRouter);
app.use('/news', newsRouter);
app.use('/courses', coursesRouter);
app.use('/chapters', chaptersRouter);
app.use('/students', studentsRouter);
app.use('/tutorials', tutorialsRouter);

if (process.env.NODE_ENV === "production") {
    app.use(express.static('frontend/build'));
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
    })
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
    })
}

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;