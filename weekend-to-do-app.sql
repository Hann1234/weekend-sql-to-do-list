--Create table in database--

CREATE TABLE list (
"id" serial PRIMARY KEY,
"task" varchar(250),
"notes" varchar(250),
"completed" varchar(1)
);

-- Insert test tasks to populate on pageload --
INSERT INTO list ("task", "notes", "completed")
VALUES ('Take out trash.', 'Do this before it gets stinky!', 'Y'),
('Walk doggo.', 'Do not forget to pick up his poo!', 'N');

-- run this statement to view list table
SELECT *
FROM list;