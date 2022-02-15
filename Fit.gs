const UID = "<EDIT>";
const DataSourceID = "<EDIT>";

function sendToFit() {
  const date = Date.now();
  const fat = 20;

  Logger.log(date);
  getSources();
}

function getSources() {
  const fitService = getFitService();
  Logger.log(fitService.getAccessToken());
  const options = {
    'headers': {
      'Authorization': 'Bearer ' + fitService.getAccessToken(),
      'Accept': 'application/json'
    },
    'method' : 'get',
    'contentType' : 'application/json'
  };
  const response = UrlFetchApp.fetch(`https://www.googleapis.com/fitness/v1/users/me/dataSources`, options);
  Logger.log(response.getContentText())
}

function createSource() {
  const fitService = getFitService();
  const request = {
    "dataStreamName": "SheetsData",
    "type": "raw",
    "device": {
      "uid": UID,
      "type": "scale",
      "version": "1",
      "model": "Body+",
      "manufacturer": "Withings"
    },
    "dataType": {
      "name": "com.google.body.fat.percentage",
    },
    "application": {
      "name": "SheetsData"
    }
  };
  const response = UrlFetchApp.fetch('https://www.googleapis.com/fitness/v1/users/me/dataSources', {
    headers: {
      Authorization: 'Bearer ' + fitService.getAccessToken()
    },
    'method' : 'post',
    'contentType' : 'application/json',
    'payload' : JSON.stringify(request, null, 2)
  });
  Logger.log(response.getContentText())
  return response.getContentText();
}

function getSource() {
  const fitService = getFitService();
  const response = UrlFetchApp.fetch(`https://www.googleapis.com/fitness/v1/users/me/dataSources/${encodeURIComponent(DataSourceID)}`, {
    headers: {
      Authorization: 'Bearer ' + fitService.getAccessToken()
    },
    'method' : 'get',
    'contentType' : 'application/json',
  });
  Logger.log(response.getContentText())
}

function updateFat(date, value) {
  const fitService = getFitService();
  Logger.log(date);
  const request = {
    "minStartTimeNs": date,
    "maxEndTimeNs":   date,
    "dataSourceId": DataSourceID,
    "point": [
      {
      "startTimeNanos": date,
      "endTimeNanos":   date,
      "dataTypeName": "com.google.body.fat.percentage",
      "value": [
        {
        "fpVal": value
        }
      ]
      }
    ]
  };
  const response = UrlFetchApp.fetch(`https://www.googleapis.com/fitness/v1/users/me/dataSources/${encodeURIComponent(DataSourceID)}/datasets/${date}-${date}`, {
    headers: {
      Authorization: 'Bearer ' + fitService.getAccessToken()
    },
    'method' : 'patch',
    'contentType' : 'application/json',
    'payload' : JSON.stringify(request, null, 2),
    'muteHttpExceptions': true
  });
  Logger.log(response.getContentText())
  return response.getContentText();
}
