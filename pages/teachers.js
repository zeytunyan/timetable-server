'use strict';

module.exports.sendXmlData = (serverRequest, serverResponse) => {

    const mariadb = require("mariadb");
    const toXml = require("../toXML");

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
            conn.query("SELECT * FROM teachers ORDER BY Name")
                .then((rows) => {
                    // Getting results and output to the console
                    console.log(rows);
                    const xmlData = toXml.getXML(rows, 'teachers', 'teacher');
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
