var express = require('express');
var router = express.Router();
var connection = require('../db');

// get all records
router.get('/', function (req, res) {
    var query = "SELECT * FROM students_record";
    connection.query(query, function (error, results) {
        if (error) throw error;
        res.json(results);
    });
});
//get records by user_id
router.get('/:id', function (req, res) {
    var id = req.params.id;
    var query = `SELECT * from students_record where student_id = "${id}"`
    connection.query(query, function (error, results) {
        if (error) throw error;
        res.json(results);
    })
})
//post records
router.post('/create', (req, res) => {
    console.log('from server', req.body.student_id)
    var examination_date = req.body.examination_date;
    var student_id = req.body.student_id;
    var course = req.body.course;
    var exam_type = req.body.exam_type;
    var scores = req.body.scores;
    var remarks = req.body.remarks;
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var v_created_on = date + ' ' + time;

    var query = `INSERT INTO students_record (examination_date, student_id, course, exam_type,scores, remarks, created_on) VALUES ("${examination_date}", "${student_id}", "${course}", "${exam_type}", "${scores}", "${remarks}", "${v_created_on}")`;
    connection.query(query, (err, rows) => {
        if (!err) {
            res.send(rows);
        } else {
            throw err;
        }
    });
});
module.exports = router;