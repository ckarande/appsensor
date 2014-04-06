## Steps to use the appSensor REST Client:

- Require the module and start polling for responses
```
  var appSensorClient = require("appsensor-rest-client");
  appSensorClient.startPollingResponses();
```

- To add event to appSensor server
```
 appSensorClient.addEvent("SOME_USER_NAME", "SOME_DETECTION_POINT");
```