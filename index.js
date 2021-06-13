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

// Get the number of users connected
var clients = {};

// Events on socket.io

// When a connection event fires, or a connection
// is established, we define a callback method
// Here, the parameter (socket) is the object of the client
io.on("connection", (socket) => {
    console.log("Connected")

    // Print the ID of the client
    console.log(socket.id, " JOINED");

    // Listen to the event we created on the frontend ( signin ) 
    // To get the user ID 
    socket.on("signin", (id) => {
        // See what ID is passed from the frontend
        console.log(id);

        // Add the current socket to the clients object
        // To show that to the other client
        // Here, key of the value is ID of the user that is
        // passed and the value is the socket
        clients[id] = socket;

    })

    // Whenever a message is sent, this event is called
    socket.on("message", (msg) => {
        console.log(msg)
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