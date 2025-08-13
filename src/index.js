const express = require("express");
const bodyParser = require("body-parser");

const { PORT } = require("./config/serverConfig");
const apiroutes = require("./routes/index");

const app = express();

// Function to configure middleware and start the server
const prepareAndStartServer = () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use("/api", apiroutes);
    app.listen(PORT, () => {
        console.log(`Server started at PORT: ${PORT}`);
    });
};

prepareAndStartServer();
