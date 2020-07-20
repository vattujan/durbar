var express = require('express');
var router = express.Router();
var connection = require('../db');

// Get all schools
router.get('/', function (req, res) {
    var query = "SELECT * FROM schools";
    connection.query(query, function (error, results) {
        if (error) console.log(error);
        res.json(results);

    });
});

// create a school
router.post('/create', (req, res) => {
    var v_school_name = req.body.v_school_name;
    var v_school_short_name = req.body.v_school_short_name;
    var v_school_email = req.body.v_school_email;
    var v_school_website = req.body.v_school_website;
    var v_school_phone_number = req.body.v_school_phone_number;
    var v_school_address = req.body.v_school_address;
    var v_school_registration_number = req.body.v_school_registration_number;
    var v_school_verified = req.body.v_school_verified;

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var v_created_on = date + ' ' + time;

    var query = `INSERT INTO schools (school_name, school_short_name, school_email, school_website, school_phone_number, school_address, school_registration_number, school_verified, created_on) VALUES ("${v_school_name}", "${v_school_short_name}", "${v_school_email}", "${v_school_website}", "${v_school_phone_number}", "${v_school_address}", "${v_school_registration_number}", "${v_school_verified}", "${v_created_on}")`;
    connection.query(query, (err, rows) => {
        if (!err) {
            res.send(rows);
            console.log(rows)
        } else {
            console.log(err)
            throw err;
        }
    });
});

// Edit school
router.put('/edit/:id', function (req, res) {
    var id = req.params.id;
    var v_school_verified = req.body.value

    var query = `UPDATE schools SET school_verified = '${v_school_verified}' WHERE school_id = '${id}'`;
    connection.query(query, (err, rows) => {
        if (!err) {
            res.send(rows);
            console.log(query)
        } else {
            console.log(err)
            throw err;
        }
    });
})

// Delete school
router.delete('/delete/:id', function (req, res) {
    var id = req.params.id;
    connection.query(`DELETE from schools where school_id = '${id}'`, function (error, rows) {
        if (error) throw error;
        res.send(rows);
    });
});


module.exports = router;