const exceljs = require('exceljs');

async function convertToObjectArray(filePath) {
  const workbook = new exceljs.Workbook();
  await workbook.xlsx.readFile(filePath);
  
  const worksheet = workbook.getWorksheet(1);
  const rowsCount = worksheet.rowCount;
  let objectArray = [];
  // get the first row for the keys
  let keys = worksheet.getRow(1).values;

    const fs = require('fs');

  for(let i=2; i<=rowsCount; i++) {
    let obj = {};
    let row = worksheet.getRow(i);
    row.eachCell((cell, index) => {
        if (i === 2) {
            // console.log("cell value, index ", index, cell.value, keys[index]);
        }

        obj[keys[index]] = cell.value;  
    });
    function updateComma(str) {
        return str.includes(',') ? str.replace(',', '-') : str;
    }
    obj['normalizedName'] = updateComma(obj['reducedName']);
    // console.log("obj", obj)
    objectArray.push(obj);



    fs.writeFileSync(`./city-data/${obj['normalizedName']}.json`, JSON.stringify(obj));
    console.log('Data written to file');
  }
}
convertToObjectArray('./app/public/assets/data/USCensusData.xlsx');
