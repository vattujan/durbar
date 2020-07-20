var express = require('express');
var router = express.Router();
var connection = require('../db');

// Get all courses
router.get('/', (req, res) => {
    var query = `SELECT * from courses`
    connection.query(query, (error, results) => {
        if (error) console.log(error);
        res.json(results);
    })
})
// Get all courses by parentUId
router.get('/:parentuid', (req, res) => {
    var parentuid = req.params.parentuid;
    var query = `SELECT * from courses where course_parentuid = "${parentuid}"`
    connection.query(query, (error, results) => {
        if (error) console.log(error);
        res.json(results);
    })
})
// create a courses
router.post('/create', (req, res) => {
    var v_course_title = req.body.v_course_title;
    var v_course_description = req.body.v_course_description;
    var v_course_semester = req.body.v_course_semester;
    var v_course_class = req.body.v_course_class;
    var v_course_parentuid = req.body.v_course_parentuid;

    var query = `INSERT INTO courses (course_title, course_description, course_semester, course_class, course_parentuid) VALUES ("${v_course_title}", "${v_course_description}","${v_course_semester}","${v_course_class}", "${v_course_parentuid}")`;
    connection.query(query, (err, rows) => {
        if (!err) {
            res.send(rows);
        } else {
            throw err;
        }
    });
});

// Edit course
router.put('/edit/:id', function (req, res) {
    var v_course_id = req.params.id;
    var v_course_title = req.body.v_course_title;
    var v_course_description = req.body.v_course_description;
    var v_course_class = req.body.v_course_class;
    var v_course_semester = req.body.v_course_semester;

    var query = `UPDATE courses SET course_title = '${v_course_title}', course_description = '${v_course_description}', course_class = '${v_course_class}', course_semester = '${v_course_semester}' WHERE course_id = '${v_course_id}'`;
    connection.query(query, (err, rows) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err)
            throw err;
        }
    });
})

//get courses by id
router.get('/detail/:id', (req, res) => {
    var id = req.params.id;
    var query = `SELECT * from courses where course_id = ${id}`
    connection.query(query, (error, results) => {
        if (error) throw error;
        res.json(results);
    })
})

//get courses by id
router.get('/:parentuid/:cclass/:sem', (req, res) => {
    var parentuid = req.params.parentuid;
    var cclass = req.params.cclass;
    var sem = req.params.sem;
    var query = `SELECT * from courses where course_parentuid = "${parentuid}" and course_class = "${cclass}" and course_semester = "${sem}"`
    connection.query(query, (error, results) => {
        if (error) throw error;
        res.json(results);
    })
})

module.exports = router;