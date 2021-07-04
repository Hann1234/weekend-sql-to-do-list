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

// POST - INSERT: Adding task to database

taskRouter.post('/', (req, res) => {
    const newTask = req.body;
    const queryText = `
    INSERT INTO list ("task", "notes", "completed")
    VALUES ($1, $2, $3);
    `;
    pool.query(queryText, [newTask.task, newKoala.notes, newKoala.completed])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log(`Error making query ${queryText}`, err);
            res.sendStatus(500);
        });
});

// INSERT INTO list ("task", "notes", "completed")
// VALUES ('Take out trash.', 'Do this before it gets stinky!', 'Y')