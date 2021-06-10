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
io.on("connection", (socket) => {
    console.log("Connected")

    // Print the ID of the client
    console.log(socket.id, " JOINED");

    // Listen to the event we created on the frontend ( test )
    socket.on("/test", (msg) => {
        // See what message is passed from the frontend
        console.log(msg);
    })
});

// Listen to the server on the corresponding PORT
// We just provide the method with the PORT and
// have an additional callback method 
// (Function that is fired when server is started)

// To launch the server on the current IP address,
// We use 0.0.0.0
server.listen(port, "0.0.0.0", () => {
    console.log(`Server running on PORT ${port}`);
})