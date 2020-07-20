var express = require('express');
var router = express.Router();
var connection = require('../db');

// Get all news
router.get('/', function (req, res) {
    var query = "SELECT * FROM news";
    connection.query(query, function (error, results) {
        if (error) throw error;
        res.json(results);
    });
});

// create a news
router.post('/create', (req, res) => {
    var v_news_title = req.body.v_news_title;
    var v_news_content = req.body.v_news_content;
    var user_id = req.body.user;
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var v_created_on = date + ' ' + time;

    var query = `INSERT INTO news (news_title, news_content, created_on, user_id) VALUES ("${v_news_title}", "${v_news_content}","${v_created_on}", "${user_id}")`;
    connection.query(query, (err, rows) => {
        if (!err) {
            res.send(rows);
        } else {
            throw err;
        }
    });
});
//get news by id
router.get('/detail/:id', function (req, res) {
    var id = req.params.id;
    var query = `SELECT * from news where news_id = ${id}`
    connection.query(query, function (error, results) {
        if (error) throw error;
        res.json(results);
    })
})
//get news by user_id
router.get('/:id', function (req, res) {
    var id = req.params.id;
    var query = `SELECT * from news where user_id = "${id}"`
    connection.query(query, function (error, results) {
        if (error) throw error;
        res.json(results);
    })
})

// Delete news
router.delete('/delete/:id', function (req, res) {
    var id = req.params.id;
    connection.query(`DELETE from news where news_id = '${id}'`, function (error, rows) {
        if (error) throw error;
        res.send(rows);
    });
});


module.exports = router;