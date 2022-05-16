// Imports
const { X12parser } = require('x12-parser');
const { createReadStream } = require('fs');

// Create a new parser
const myParser = new X12parser();
myParser.on('error', err => {
    console.error(err);
})

// Create a read stream from a file
const ediFile = createReadStream('edi_837.txt')
ediFile.on('error', err => {
    console.error(err);
})

// Handle events from the parser
ediFile.pipe(myParser).on('data', data => {
    console.log(data);
})

// Output example:
    // { --- 1st Obj emitted
    //     '1': '00',
    //     '2': '',
    //     '3': '00',
    //     '4': '',
    //     '5': 'ZZ',
    //     '6': 'EMEDNYBAT',
    //     '7': 'ZZ',
    //     '8': 'ETIN',
    //     '9': '100101',
    //     '10': '1000',
    //     '11': '^',
    //     '12': '00501',
    //     '13': '006000600',
    //     '14': '0',
    //     '15': 'T',
    //     '16': ':',
    //     name: 'ISA'
    // }
    // { --- 2nd Obj emitted
    //     '1': 'HP',
    //     '2': 'EMEDNYBAT',
    //     '3': 'ETIN',
    //     '4': '20100101',
    //     '5': '1050',
    //     '6': '6000600',
    //     '7': 'X',
    //     '8': '005010X221A1',
    //     name: 'GS'
    // },