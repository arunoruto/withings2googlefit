const sheetID = "<EDIT>";
const sheetName = "Sheet1";

function atEdit(event) {

}

function atChange(event) {
  // const sheet = event.source.getActiveSheet();
  Logger.log(event.changeType)
  if (event.changeType == "INSERT_ROW") {
    Logger.log(event.source.getActiveRange().getA1Notation())
    syncEntry(event);
  }
  updateChartBounds();
}

function syncEntry(event) {
  const sheet = event.source.getActiveSheet();
  const dataRange = sheet.getDataRange();

  const regex = /[A-Z]+[0-9]+\:[A-Z]+([0-9]+)/g;
  const match = regex.exec(dataRange.getA1Notation());
  Logger.log(dataRange.getA1Notation())
  if (match == null || match.length < 2) return;
  const row = match[1];
  if (row == undefined || row == null) return;
  const checkbox = sheet.getRange(parseInt(row), 7).insertCheckboxes();
  Logger.log(parseInt(row))

  let data = sheet.getRange(`A${row}:G${row}`).getValues();
  Logger.log(data);
  data = data[0];
  const date      = data[0];
  const mass      = data[1];
  const unit      = data[2];
  const fatt_kg   = data[3];
  const fatt_pct  = data[4];
  const lean = data[5];
  // Logger.log(`${date} ${mass} ${unit} ${fatt_kg} ${fatt_pct} ${lean}`);

  // December 7, 2021 at 11:24AM
  const date_pieces = /(\w+) (\d+), (\d+) at (\d+):(\d+)(AM|PM)/.exec(date);
  const day     = date_pieces[2];
  const month   = date_pieces[1].substr(0, 3);
  const year    = date_pieces[3];
  const ampm    = date_pieces[6];
  const hour    = parseInt(date_pieces[4]) + 12 * (ampm == "PM" && date_pieces[4] != "12");
  const minute  = date_pieces[5];
  const dateObj = new Date(`${day} ${month} ${year} ${hour}:${minute}:00`);
  // Logger.log(`${day} ${month} ${year} ${hour}:${minute}:00`)
  // Logger.log(`${dateObj * 1e6}, ${fatt_pct}`);
  updateFat(dateObj.getTime() * 1e6, fatt_pct);
  checkbox.check();

  sheet.getRange(parseInt(row), 8).setValue(`${dateObj.getDate()}\/${dateObj.getMonth()+1}\/${dateObj.getFullYear()}`);
}

function syncAll() {
  const sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
  const dataRange = sheet.getDataRange();
  const data = sheet.getRange(dataRange.getA1Notation().replace("A1", "A2")).getValues();
  data.forEach((datum, idx) => {
    const checkbox = sheet.getRange(2 + idx, 7).insertCheckboxes();

    const date = datum[0];
    const mass = datum[1];
    const unit = datum[2];
    const fatt_kg = datum[3];
    const fatt_pct = datum[4];
    const lean = datum[5];
    const synced = datum[6];

    const date_pieces = /(\w+) (\d+), (\d+) at (\d+):(\d+)(AM|PM)/.exec(date);
    const day = date_pieces[2];
    const month = date_pieces[1].substr(0, 3);
    const year = date_pieces[3];
    const ampm = date_pieces[6];
    const hour = parseInt(date_pieces[4]) + 12 * (ampm == "PM" && date_pieces[4] != "12");
    const minute = date_pieces[5];
    const dateObj = Date.parse(`${day} ${month} ${year} ${hour}:${minute}:00`);

    updateFat(dateObj * 1e6, fatt_pct);
    checkbox.check();

    sheet.getRange(2 + idx, 8).setValue(`${day}\/${month}\/${year} ${hour}:${minute}`);
  })
}

function syncLast() {
  const sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
  const dataRange = sheet.getDataRange();

  const regex = /[A-Z]+[0-9]+\:[A-Z]+([0-9]+)/g;
  const match = regex.exec(dataRange.getA1Notation());
  Logger.log(dataRange.getA1Notation())
  if (match == null || match.length < 2) return;
  const row = match[1];
  if (row == undefined || row == null) return;
  const checkbox = sheet.getRange(parseInt(row), 7).insertCheckboxes();
  Logger.log(parseInt(row))

  let data = sheet.getRange(`A${row}:G${row}`).getValues();
  Logger.log(data);
  data = data[0];
  const date      = data[0];
  const mass      = data[1];
  const unit      = data[2];
  const fatt_kg   = data[3];
  const fatt_pct  = data[4];
  const lean = data[5];
  // Logger.log(`${date} ${mass} ${unit} ${fatt_kg} ${fatt_pct} ${lean}`);

  // December 7, 2021 at 11:24AM
  const date_pieces = /(\w+) (\d+), (\d+) at (\d+):(\d+)(AM|PM)/.exec(date);
  const day     = date_pieces[2];
  const month   = date_pieces[1].substr(0, 3);
  const year    = date_pieces[3];
  const ampm    = date_pieces[6];
  const hour    = parseInt(date_pieces[4]) + 12 * (ampm == "PM" && date_pieces[4] != "12");
  const minute  = date_pieces[5];
  const dateObj = Date.parse(`${day} ${month} ${year} ${hour}:${minute}:00`);
  // Logger.log(`${day} ${month} ${year} ${hour}:${minute}:00`)
  // Logger.log(`${dateObj * 1e6}, ${fatt_pct}`);
  updateFat(dateObj * 1e6, fatt_pct);
  checkbox.check();

  sheet.getRange(parseInt(row), 8).setValue(`${day}\/${month}\/${year} ${hour}:${minute}`);
}

function syncUnchecked() {
  const sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
  const dataRange = sheet.getDataRange();
  const data = sheet.getRange(dataRange.getA1Notation().replace("A1", "A2")).getValues();

  data.forEach((datum, idx) => {
    const checkbox = sheet.getRange(2 + idx, 7).insertCheckboxes()
    if (checkbox.isChecked()) {
      return;
    }

    const date = datum[0];
    const mass = datum[1];
    const unit = datum[2];
    const fatt_kg = datum[3];
    const fatt_pct = datum[4];
    const lean = datum[5];
    const synced = datum[6];

    const date_pieces = /(\w+) (\d+), (\d+) at (\d+):(\d+)(AM|PM)/.exec(date);
    const day = date_pieces[2];
    const month = date_pieces[1].substr(0, 3);
    const year = date_pieces[3];
    const ampm = date_pieces[6];
    const hour = parseInt(date_pieces[4]) + 12 * (ampm == "PM" && date_pieces[4] != "12");
    const minute = date_pieces[5];
    const dateObj = new Date(`${day} ${month} ${year} ${hour}:${minute}:00`);

    updateFat(dateObj.getTime() * 1e6, fatt_pct);
    checkbox.check();

    sheet.getRange(2 + idx, 8).setValue(`${dateObj.getDate()}\/${dateObj.getMonth()+1}\/${dateObj.getFullYear()}`);
  })
}

function updateChartBounds() {
  const sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);

  const highest = Math.ceil(sheet.getRange("J2").getValues()[0][0]);
  const lowest = Math.floor(sheet.getRange("L2").getValues()[0][0]);
  let chart = sheet.getCharts()[0];
  chart = chart.modify()
    .setOption('vAxes', {
      0: {
        format: 'none',
        viewWindow: {
          max: highest,
          min: lowest
        }
      }
    })
    .setOption('trendlines', {
      0: {
        type: 'polynomial',
        degree: 4,
        lineWidth: 2,
        opacity: 0.8,
        color: '#4285f4',
        visibleInLegend: false
      }
    })
    .build();
  sheet.updateChart(chart);
}

// function customSync() {
//   const date = 1639009640000;
//   const value = "20.33";
//   updateFat(date * 1e6, value);
// }
