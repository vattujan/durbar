var express = require('express');
var router = express.Router();
var connection = require('../db');
var upload = require('../aws_service');
const multipleUpload = upload.array('tutorial_docs', 3);

// create a tutorials
router.post('/create', multipleUpload, (req, res) => {
    console.log(req.body.course_title)
    var course_title = req.body.course_title;
    var gallery = req.files;
    var tutorial_parentuid = req.body.tutorial_parentuid;
    const tutorial_docs = [];
    for (let i = 0; i < gallery.length; i++) {
        productKey = gallery[i].key;
        tutorial_docs.push(productKey)
    }
    var query = `INSERT INTO course_tutorial (course_id, tutorial_docs, tutorial_parentuid) VALUES ((Select course_id from courses where course_title = "${course_title}"), "${tutorial_docs}", "${tutorial_parentuid}")`;
    connection.query(query, (err, rows) => {
        if (!err) {
            res.send(rows);
        } else {
            throw err;
        }
    });
});
router.get('/:id', function (req, res) {
    var id = req.params.id;
    var query = `SELECT * from course_tutorial where course_id = "${id}"`
    connection.query(query, function (error, results) {
        if (error) throw error;
        res.json(results);
    })
})

module.exports = router;