'use strict';

// Convert data from database to xml format
module.exports.getXML = function (rows, rootTag = 'rows', eachRowTag = 'row') {
    rootTag = rootTag.toLowerCase();
    eachRowTag = eachRowTag.toLowerCase();
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
    <${rootTag}>
`;
    rows.forEach(row => {
        xml += `        <${eachRowTag}>
`;
        for (let key in row) {
            const lowerKey = key.toLowerCase();

            xml += `            <${lowerKey}>${row[key]}</${lowerKey}>
`;
        }
        xml += `        </${eachRowTag}>
`;
    });

    xml += `    </${rootTag}>
`;

    return xml;
}
