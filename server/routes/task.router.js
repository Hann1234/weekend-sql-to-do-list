const pool = require('../modules/pool');
const express = require('express');
const { Pool } = require('pg');
const taskRouter = express.Router();

// GET TABLE INFO

taskRouter.get('/', (req, res) => {
    //create variable to hold SQL query
    let queryText = 'SELECT * FROM "list";';
    //make SQL query to DB
    pool.query(queryText)
    .then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('Error trying to get the koala from Postgres', error);
        res.sendStatus(500);
    });
});