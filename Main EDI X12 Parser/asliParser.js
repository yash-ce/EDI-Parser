const { X12parser, X12grouper, Schema } = require('x12-parser');
const { createReadStream } = require('fs');

const schema = {
    "start": "ISA", // What segment starts the group
    "end": "IEA", // What segment ends the group
    "name": "Envelope", // What is the name of the group
    "groups": [ // Nested groups
        {
            "start": "BPR",
            "terminators": ["N1"],
            "name": "headers"
        },
        {
            "start": "N1",
            "terminators": ["LX"],
            "name": "1000"
        },
        {
            "start": "LX",
            "name": "2000",
            "terminators": ["SE"],
            "groups": [
                {
                    "start": "CLP",
                    "name": "2100",
                    "groups": [
                        {
                            "start": "SVC",
                            "name": "2110",
                        }
                    ]
                }
            ]
        }
    ]
}

const myParser = new X12parser();
const mySchema = new Schema('005010X221A1', schema);
const myGrouper = new X12grouper(mySchema);

const testFile = createReadStream('TEST_837P.EDI.txt')

// testFile.pipe(myParser).pipe(myGrouper).on('data', data => {
//     // console.log(data)
//     str = JSON.stringify(data);
// str = JSON.stringify(data, null, 4); // (Optional) beautiful indented output.
// console.log(str);
// const fs = require('fs');
// const yourObject = data;

// fs.writeFile("save.json", JSON.stringify(yourObject), 'utf8', function (err) {
//     if (err) {
//         return console.log(err);
//     }

//     console.log("The file was saved!");
// }); 
    
// })


// ------------------------------------------------------\\

// var IEAMAP = new Map();
// IEAMAP.set("1", "Number of Included Functional Groups");
// IEAMAP.set("2", "Interchange Control Number");

// var GEMAP = new Map();
// GEMAP.set("1", "Number of Transaction Sets Included");
// GEMAP.set("2", "Group Control Number");

// var STMAP = new Map();
// STMAP.set("1", "Number of Included Segments");
// STMAP.set("2", "Transaction Set Control Number");


// var NM1MAP = new Map();
// NM1MAP.set("1", "Entity Identifier Code");
// NM1MAP.set("2", "Entity Type Qualifier");
// NM1MAP.set("3", "Name Last or Organization Name");
// NM1MAP.set("4", "Name First");
// NM1MAP.set("5", "Name Middle");
// NM1MAP.set("6", "");
// NM1MAP.set("7", "Name Suffix");
// NM1MAP.set("8", "Identification Code Qualifier");
// NM1MAP.set("9", "Identification Code");

// var REFMAP = new Map();
// REFMAP.set("1", "Reference Identification Qualifie");
// REFMAP.set("2", "Reference Identification");

// var DTPMAP = new Map();
// DTPMAP.set("1", "Date Time Qualifier");
// DTPMAP.set("2", "Date Time Period Format Qualifier");
// DTPMAP.set("3", "Date Time Period ");


// var SV1MAP = new Map();
// SV1MAP.set("1", "Product/Service ID Qualifier");
// SV1MAP.set("2", "Monetary Amount");
// SV1MAP.set("3", "Unit or Basis for Measurement Code");
// SV1MAP.set("4", "Quantity");
// SV1MAP.set("5", "Facility Code Valuer");
// SV1MAP.set("6", "");
// SV1MAP.set("7", "Diagnosis Code Pointer");

// var LXMAP = new Map();
// LXMAP.set("1", "Assigned Number");


// var HIMAP = new Map();
// HIMAP.set("1", " Code List Qualifier Code / INdustry Code");
// HIMAP.set("2", "Code List Qualifier Code / INdustry Code");
// HIMAP.set("3", "Code List Qualifier Code / INdustry Code");
// HIMAP.set("4", "Code List Qualifier Code / INdustry Code");
// HIMAP.set("5", "Code List Qualifier Code / INdustry Code");
// HIMAP.set("6", "Code List Qualifier Code / INdustry Code");
// HIMAP.set("7", "Code List Qualifier Code / INdustry Code");
// HIMAP.set("8", "Code List Qualifier Code / INdustry Code");


// var NTEMAP = new Map();
// NTEMAP.set("1", "Note Ref Code");
// NTEMAP.set("2", "Date Time Period Format Qualifier");
// NTEMAP.set("3", "Description");

// var CLMMAP = new Map();
// CLMMAP.set("1", "Subscriber Identifier");
// CLMMAP.set("2", "Monetary Amount ");
// CLMMAP.set("3", "");
// CLMMAP.set("4", "");
// CLMMAP.set("5", "Facility Code Value/ Claim Frequency Type code");
// CLMMAP.set("6", "Yes/No condition or Response Code");
// CLMMAP.set("7", "Provider Accept Assignment Code");
// CLMMAP.set("8", "Yes/No Condition or Response Code");
// CLMMAP.set("9", "Release of Information Code");
// CLMMAP.set("10","Patient Signature Source Code");

// var DMGMAP = new Map();
// DMGMAP.set("1", "Date/Time Period Format Qualifier");
// DMGMAP.set("2", "Date Time Period");
// DMGMAP.set("3", "Gender Code");

//###$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$\\
// ISA MAP

var ISAMap = new Map();

ISAMap.set('1', 'Authorization Information Qualifier')

ISAMap.set('2', 'Authorization Information')

ISAMap.set('3', 'Security Information Qualifier')

ISAMap.set('4', 'Security Information')

ISAMap.set('5', 'Security Information')

ISAMap.set('6', 'Interchange Sender ID')

ISAMap.set('7', 'Interchange ID Qualifier')

ISAMap.set('8', 'Interchange Receiver ID')

ISAMap.set('9', 'Interchange Date')

ISAMap.set('10','Interchange Time')

ISAMap.set('11', 'Interchange Control Standards ID')

ISAMap.set('12', 'Interchange Control Version Number')

ISAMap.set('13', 'Interchange Control Number')

ISAMap.set('14', 'Acknowledgment Requested')

ISAMap.set('15', 'Usage Indicator')

ISAMap.set('16', 'Component Element Separator')

//GS MAP

var GSMap = new Map()

GSMap.set('1', 'Component Element Separator')

GSMap.set('2', "Application Sender's Code")

GSMap.set('3', "Application Receiver's Code")

GSMap.set('4', "Date")

GSMap.set('5', "Time")

GSMap.set('6', "Group Control Number")

GSMap.set('7', "Responsible Agency Code")

GSMap.set('8', "Version/Release/ Industry ID Code")

// ST MAP

var STMap = new Map()

STMap.set("1", "Transaction Set Identifier Code")

STMap.set("2", "Transaction Set Control Number")

// BHT Map

var BHTMap = new Map()

BHTMap.set('1', "Hierarchical Structure Code")

BHTMap.set('2',"Transaction Set Purpose Code")

BHTMap.set('3', " Reference Identification")

BHTMap.set('4',"Date")

BHTMap.set('5',"Time")

BHTMap.set('6', " Transaction Type Code")

// PER MAP

var PERMap = new Map()

PERMap.set("1", "Contact Function Code")

PERMap.set("2", "Name")

PERMap.set("3", "Communication Number Qualifier")

PERMap.set("4", "Communication Number")

PERMap.set("5", "Communication Number Qualifier")

PERMap.set("6", "Communication Number")

// HL MAP

var HLMap = new Map()

HLMap.set("1","Hierarchical ID Number")

HLMap.set('2',"Parent Hierarchical ID: No Parent")

HLMap.set('3',"Hierarchical Level Code")

HLMap.set('4', "Hierarchical Child Code")

// N3 MAP

var N3Map = new Map()

N3Map.set("1", "Sender Address Information")

N3Map.set("2", "Receiver Address Information")

//N4 MAP

var N4Map = new Map()

N4Map.set('1',"City Name")

N4Map.set('2',"State or Province Code")

N4Map.set('3',"Postal Code")

// SBR MAP

var SBRMap = new Map()

SBRMap.set("1", "Payer Responsibility Sequence Number Code")

SBRMap.set("2", "Individual Relationship Code")

SBRMap.set("3", "Reference Identification")

SBRMap.set("4", " Name")

SBRMap.set("5","Insurance Type Code")

SBRMap.set("9","Claim Filing Indicator Code")

// Rest of the code

var IEAMAP = new Map();

IEAMAP.set("1", "Number of Included Functional Groups");

IEAMAP.set("2", "Interchange Control Number");

 

var GEMAP = new Map();

GEMAP.set("1", "Number of Transaction Sets Included");

GEMAP.set("2", "Group Control Number");

 

var STMAP = new Map();

STMAP.set("1", "Number of Included Segments");

STMAP.set("2", "Transaction Set Control Number");

 

var NM1MAP = new Map();

NM1MAP.set("1", "Entity Identifier Code");

NM1MAP.set("2", "Entity Type Qualifier");

NM1MAP.set("3", "Name Last or Organization Name");

NM1MAP.set("4", "Name First");

NM1MAP.set("5", "Name Middle");

NM1MAP.set("6", "");

NM1MAP.set("7", "Name Suffix");

NM1MAP.set("8", "Identification Code Qualifier");

NM1MAP.set("9", "Identification Code");

 

var REFMAP = new Map();

REFMAP.set("1", "Reference Identification Qualifie");

REFMAP.set("2", "Reference Identification");

 

var DTPMAP = new Map();

DTPMAP.set("1", "Date Time Qualifier");

DTPMAP.set("2", "Date Time Period Format Qualifier");

DTPMAP.set("3", "Date Time Period ");

 

var SV1MAP = new Map();

SV1MAP.set("1", "Product/Service ID Qualifier");

SV1MAP.set("2", "Monetary Amount");

SV1MAP.set("3", "Unit or Basis for Measurement Code");

SV1MAP.set("4", "Quantity");

SV1MAP.set("5", "Facility Code Valuer");

SV1MAP.set("6", "");

SV1MAP.set("7", "Diagnosis Code Pointer");

 

var LXMAP = new Map();

LXMAP.set("1", "Assigned Number");

 

var HIMAP = new Map();

HIMAP.set("1", " Code List Qualifier Code / INdustry Code");

HIMAP.set("2", "Code List Qualifier Code / INdustry Code");

HIMAP.set("3", "Code List Qualifier Code / INdustry Code");

HIMAP.set("4", "Code List Qualifier Code / INdustry Code");

HIMAP.set("5", "Code List Qualifier Code / INdustry Code");

HIMAP.set("6", "Code List Qualifier Code / INdustry Code");

HIMAP.set("7", "Code List Qualifier Code / INdustry Code");

HIMAP.set("8", "Code List Qualifier Code / INdustry Code");

 

var NTEMAP = new Map();

NTEMAP.set("1", "Note Ref Code");

NTEMAP.set("2", "Date Time Period Format Qualifier");

NTEMAP.set("3", "Description");

 

var CLMMAP = new Map();

CLMMAP.set("1", "Subscriber Identifier");

CLMMAP.set("2", "Monetary Amount ");

CLMMAP.set("3", "");

CLMMAP.set("4", "");

CLMMAP.set("5", "Facility Code Value/ Claim Frequency Type code");

CLMMAP.set("6", "Yes/No condition or Response Code");

CLMMAP.set("7", "Provider Accept Assignment Code");

CLMMAP.set("8", "Yes/No Condition or Response Code");

CLMMAP.set("9", "Release of Information Code");

CLMMAP.set("10","Patient Signature Source Code");

 

var DMGMAP = new Map();

DMGMAP.set("1", "Date/Time Period Format Qualifier");

DMGMAP.set("2", "Date Time Period");

DMGMAP.set("3", "Gender Code");

// Main map

 

var map = new Map();

map.set("ISA", ISAMap)

map.set("GS", GSMap)

map.set("ST", STMap)

map.set("BHT", BHTMap)

map.set("PER",PERMap)

map.set("HL", HLMap)

map.set("N3", N3Map)

map.set("N4",N4Map)

map.set("SBR", SBRMap)

map.set("IEA", IEAMAP)

map.set("GE",GEMAP)

map.set("ST", STMAP)

map.set("NM1", NM1MAP)

map.set("REF", REFMAP)

map.set("DTP",DTPMAP)

map.set("SV1",SV1MAP)

map.set("LX",LXMAP)

map.set("HI",HIMAP)

map.set("NTE",NTEMAP)

map.set("CLM",CLMMAP)

map.set("DMG",DMGMAP)

 

console.log(map)


testFile.pipe(myParser).pipe(myGrouper).on('data', data => {
    // console.log(data)
    str = JSON.stringify(data);
str = JSON.stringify(data, null, 4); // (Optional) beautiful indented output.
console.log(str);
const fs = require('fs');
const yourObject = data;

fs.writeFile("save.json", JSON.stringify(yourObject), 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 

})