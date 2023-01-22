'use strict';

module.exports.sendXmlData = (serverRequest, serverResponse) => {

    const mariadb = require("mariadb");
    const url = require('url');
    const toXml = require("../toXML");

    // Query without 'where'
    let sqlQuery = `
                    SELECT Group_number AS "Group", 
                        Classroom_num AS "Classroom",
                        Name AS "Teacher",
                        Subject_name AS "Subject",
                        DATE_FORMAT(Lesson_time, '%W, %H:%i') AS "Time"
                    FROM timetable JOIN classrooms ON (classrooms.Id = timetable.Classroom_id)
                                    JOIN groups ON (groups.Id = timetable.Group_id)
                                    JOIN subjects ON (subjects.Id = timetable.Subject_id)
                                    JOIN teachers ON (teachers.Id = timetable.Teacher_id)
`;

    // Getting parameters from the client
    const urlParams = url.parse(serverRequest.url, true).query;

    // Check if the parameter has arrived and is it correct
    if (urlParams) {

        const validParamNames = ['Group_number', 'Classroom_num', 'Name', 'Subject_name'];
        let sqlParamKey = Object.keys(urlParams)[0];

        if (validParamNames.includes(sqlParamKey) && urlParams[sqlParamKey]) {

            const clearParam = urlParams[sqlParamKey].replace(/["']/g, "");

            // If the parameters from the client are correct, 'where' is added to the query
            if (sqlParamKey !== 'Classroom_num') {
                sqlQuery += `                    WHERE ${sqlParamKey} = '${clearParam}'
`;
            }
            else if (!isNaN(clearParam)) {
                sqlQuery += `                    WHERE ${sqlParamKey} = ${clearParam}
`;
            }
        }
    }

    sqlQuery += `                    ORDER BY Group_number, Lesson_time`;

    // Query output to the console
    console.log(sqlQuery);

    // Creating a database connection
    const pool = mariadb.createPool({
        host: 'localhost',
        user: 'root',
        database: "timetable",
        connectionLimit: 1
    });

    pool.getConnection()
        .then(conn => {
            // Query execution
            conn.query(sqlQuery)
                .then((rows) => {
                    // Getting results and output to the console
                    console.log(rows);
                    const xmlData = toXml.getXML(rows, 'timetable', 'lesson');
                    console.log(xmlData);
                    // Response
                    serverResponse.writeHead(200, { 'Content-Type': 'text/xml' });
                    serverResponse.end(xmlData);
                })
                .catch(err => {
                    console.log('Failed to execute database query.', err);
                })
                .finally(() => {
                    // Close connection
                    conn.end();
                    pool.end();
                });
        })
        .catch(err => {
            console.log('Failed to connect to database.', err)
        });
}
