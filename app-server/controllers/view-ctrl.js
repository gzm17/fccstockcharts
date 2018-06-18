var request = require("request");

var apiOptions = {
    server: "https://www.alphavantage.co",
    apikey: "MDDNQ1DMNDRJ5NPV"
    //server: "http://localhost:3000" //when run in local host
};
if (process.env.NODE_ENV === "production")
    apiOptions.server = "https://www.alphavantage.co";

var duration = "DAILY";
var symbol = "AAPL";
var interval = "60min";
var tickerData = {};
var initiated = false;

var renderShopsView = function (req, res, data) {
    //console.log("Enter view-ctrl render:", body);
    //res.setHeader("content-type", "text/html");
    res.render("../views/index", {data: data, symbol: symbol, duration: duration, interval: interval} );
}

var getTickerData = function (io, socket, ticker) {
    symbol = ticker;
    var path = "/query?function=TIME_SERIES_" + duration + "&symbol=" + symbol + "&apikey=" + apiOptions.apikey;
    console.log("API URL=", apiOptions.server + path);
    //get bars info
    var requestOptions = {
        url: apiOptions.server + path,
        method: 'GET',
        json: true
    };
    
    request(requestOptions, (err, response, body) => {
        if (err) console.log("err in resquesting data view-ctrl.js: ", err);
        var tmp={}, d1 = body["Time Series (Daily)"];
        tmp.date = [];
        tmp.values = [];
        //console.log("got data - ticker= ", symbol, " data: ", body["Time Series (Daily)"].map((d) => {return d;}));
        for (var key in d1){
            tmp.date.push(key);
            tmp.values.push(d1[key]["4. close"]*1.0);
        }
        console.log("DATA: ", tmp);
        // pass ticker data to tickerData
        if(d1) {
            //tickerData[ticker] = ticker;
            tickerData[ticker] = tmp;
        }
        if (initiated) socket.emit("addTickerData", tickerData);
        //return body;
    });   
}

module.exports.index = function(req, res) { 
    renderShopsView(req, res, {});
}


module.exports.handleTicker = function(io, socket) {
    console.log('made socket connection-2', socket.id);

    //send initial data set to graph before exchange 
    if (!initiated) {
        getTickerData(io, socket, "SPY");
        initiated = true;
    }
    //io.sockets.emit("addTickerData", result);
    
    // Handle ticker event - if new ticker is received
    socket.on('addTicker', function(ticker){
        getTickerData(io, socket, ticker.ticker);
        console.log("Ticker: ", ticker);
        //io.sockets.emit('addTickerData', result);
        //console.log("result=", result);
    });

    // Handle ticker delete from client - if remove ticker is received
    socket.on('removeTicker', function(ticker){
        console.log("removeTicker: ", ticker);
        delete tickerData[ticker.ticker];
    });
    
    // Handle ticker event - if new ticker is received
    socket.on('hello', function(msg){
        socket.emit("addTickerData", tickerData);
        //console.log("Ticker: ", ticker);
        //io.sockets.emit('addTickerData', result);
        //console.log("result=", result);
    });
}