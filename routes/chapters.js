var express = require('express');
var router = express.Router();
var connection = require('../db');
var upload = require('../aws_service_files');
const multipleUpload = upload.array('v_chapter_files', 5);

// Get all chapters by course id
router.get('/:id', (req, res) => {
    var id = req.params.id;
    var query = `SELECT * FROM chapters WHERE course_id = "${id}"`
    connection.query(query, (error, results) => {
        if (error) console.log(error);
        res.json(results);
    })
})

//get chapter by id
router.get('/detail/:id', (req, res) => {
    var id = req.params.id;
    var query = `SELECT * from chapters where chapter_id = ${id}`
    connection.query(query, (error, results) => {
        if (error) throw error;
        res.json(results);
    })
})

// create a chapter
router.post('/create/:id', multipleUpload, (req, res) => {
    var v_chapter_title = req.body.v_chapter_title;
    var v_chapter_topics = req.body.v_chapter_topics;
    var gallery = req.files;
    var v_chapter_resource = req.body.v_chapter_resource;
    var v_chapter_exercise = req.body.v_chapter_exercise;
    var v_course_id = req.params.id;
    var v_chapter_files = [];
    for (let i = 0; i < gallery.length; i++) {
        chapterKey = gallery[i].key;
        v_chapter_files.push(chapterKey)
    }
    var query = `INSERT INTO chapters (chapter_title, chapter_topics, chapter_resource, chapter_exercise, chapter_files, course_id) VALUES ("${v_chapter_title}", "${v_chapter_topics}","${v_chapter_resource}","${v_chapter_exercise}", "${v_chapter_files}", "${v_course_id}")`;
    connection.query(query, (err, rows) => {
        if (!err) {
            res.send(rows);
        } else {
            throw err;
        }
    });
});

// Edit chapter
router.put('/edit/:id', multipleUpload, (req, res) => {
    var v_chapter_id = req.params.id;
    var v_chapter_title = req.body.v_chapter_title;
    var v_chapter_topics = req.body.v_chapter_topics;
    var v_chapter_resource = req.body.v_chapter_resource;
    var v_chapter_exercise = req.body.v_chapter_exercise;
    var gallery = req.files;
    var v_chapter_files = [];
    for (let i = 0; i < gallery.length; i++) {
        chapterKey = gallery[i].key;
        v_chapter_files.push(chapterKey)
    }
    var query = `UPDATE chapters SET chapter_title = '${v_chapter_title}', chapter_topics = '${v_chapter_topics}', chapter_resource = '${v_chapter_resource}', chapter_exercise = '${v_chapter_exercise}', chapter_files = '${v_chapter_files}' WHERE chapter_id = '${v_chapter_id}'`;
    connection.query(query, (err, rows) => {
        if (!err) {
            res.send(rows);
        } else {
            throw err;
        }
    });
})

module.exports = router;