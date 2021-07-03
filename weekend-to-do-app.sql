--Create table in database--

CREATE TABLE list (
"id" serial PRIMARY KEY,
"task" varchar(250),
"notes" varchar(250),
"completed" varchar(1)
);

-- run this statement to view list table
SELECT *
FROM list;