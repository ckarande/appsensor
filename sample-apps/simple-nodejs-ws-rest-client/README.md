## Steps to use the appSensor REST Client:

1. Require the module and start polling for responses
```
  var appSensorClient = require("appsensor-rest-client");
  appSensorClient.startPollingResponses();
```
2. To add Event to appSensor server
```
 appSensorClient.addEvent("SOME_USER_NAME", "SOME_DETECTION_POINT");
```
