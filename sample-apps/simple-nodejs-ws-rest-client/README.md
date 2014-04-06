## Steps to use the AppSensor REST Client:

- Require the module and start polling for responses
```
  var appSensorClient = require("./appsensor-rest-client");
  appSensorClient.startPollingResponses();
```

- To add event to AppSensor server
```
 appSensorClient.addEvent("SOME_USER_NAME", "SOME_DETECTION_POINT");
```