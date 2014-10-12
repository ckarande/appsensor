/**
 * Simple client implementation for appSensor REST Web Service
 */


var http = require("http");
var httpOptions = {
    hostname: "localhost",
    port: 8080,
    path: "/sample-appsensor-ws-rest-server/api/v1.0",
    options: {
        headers: {
            "X-Appsensor-Client-Application-Name": "NodeRESTClient",
            "Content-Type": "application/json; charset=utf-8"
        }
    }
};

var exports = {

    /**
     * Posts an event to AppSensor REST Service
     * @param userName
     * @param detectionPoint
     */
    addEvent: function (userName, detectionPoint) {

        var req;
        var data = "{'user':{'username':'" + userName + "'}," +
            "'detectionPoint':{'id':'" + detectionPoint + "'}," +
            "'timestamp':'" + Date.now() + "'}";

        // Setup the POST request
        httpOptions.path = httpOptions.path + "/events";
        httpOptions.method = "POST";
        req = http.request(httpOptions, function () {

        });

        req.on('error', function(e) {
            console.log('Error sending event to appSensor: ' + e.message);
        });

        // post the data
        req.write(data);
        req.end();
    },

    /**
     * Poll for responses
     */
    startPollingResponses: function () {

        var twoMinutes = 1000 * 60 * 2;	// ms * s * m
        var latestTime = Date.now() - twoMinutes;

        // Set up the request
        httpOptions.path = httpOptions.path + "/reports/responses?earliest=" + latestTime;
        httpOptions.method = "GET";

        //poll for the responses every 2 minutes
        setInterval(function () {
            var req = http.request(httpOptions, function (response) {
                var content = "";

                response.on("data", function (chunk) {
                    content += chunk;
                });

                // Once done with streaming the response, parse it as json.
                response.on("end", function() {
                    var data = JSON.parse(content);
                    // Take action as suggested by the AppSensor Server
                    this.takeAction(data);
                });
            });

            req.on("error", function(e) {
                console.log("Error requesting responses from appSensor: " + e.message);
            });

        }, twoMinutes);

    },

    /**
     * Take action as suggested by the AppSensor server in response to events.
     * @param response
     */
    takeAction: function (response) {
        if (response && response.action) {
            console.log("AppSensor suggested action:" + response.action);
        }
    }
};

module.exports = exports;

