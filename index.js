// Importing the necessary libraries
const express = require("express");
var http = require("http");
const cors = require("cors");

// Initialize the express app
const app = express();

// Define the port (In the local machine run at port 5000)
const port = process.env.port || 5000;

// Create an http server
var server = http.createServer(app);

// Get socket.io
// We pass a server, since socket io requires a server to run
var io = require("socket.io")(server, {
    cors: {
        origin: "*"
    }
});

// Define the middleware

// For decoding the JSON data
app.use(express.json());
// Allow CORS-Cross Origin Resouce Sharing ( Share data between different URL's)
app.use(cors());

// Events on socket.io

// When a connection event fires, or a connection
// is established, we define a callback method
io.on("Connection", (socket) => {
    console.log("Connected")
});

// Listen to the server on the corresponding PORT
// We just provide the method with the PORT and
// have an additional callback method 
// (Function that is fired when server is started)
server.listen(port, () => {
    console.log(`Server running on PORT ${port}`);
})