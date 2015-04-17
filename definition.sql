----Inner Join---
SELECT column_name(s)
FROM table1
JOIN table2
ON table1.column_name=table2.column_name;
==============================================

-----UNION------
SELECT column_name(s) FROM table1
UNION ALL
SELECT column_name(s) FROM table2;

===========================================

-----The SELECT INTO statement selects data from one table and inserts it into a new table.-----
SELECT column_name(s)
INTO newtable [IN externaldb]
FROM table1;

===============================================

-----The HAVING clause was added to SQL because the WHERE keyword could not be used with aggregate functions.----------
SELECT column_name, aggregate_function(column_name)
FROM table_name
WHERE column_name operator value
GROUP BY column_name
HAVING aggregate_function(column_name) operator value;

=========================================================
