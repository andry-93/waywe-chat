/* eslint-disable */
let path = require("path");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "/app/"));

const server = app.listen(port, () => {
	console.log(`Server listening on port: ${port}`);
});

const io = require("socket.io")(server);

const helmet = require("helmet");

const router = express.Router();

const schedulerRouter = require("./scheduler/router");

// add listeners to basic CRUD requests
const Storage = require("./scheduler/storage");

// add listeners to basic CRUD with recurring events support
const RecurringStorage = require("./scheduler/storage_recurring");

// we'll use mysql for db access and util to promisify queries
const util = require("util");
const mysql = require("mysql");
// use body parse for parsing POST request
const bodyParser = require("body-parser");

// use your own parameters for database
const mysqlConfig = {
	connectionLimit: 10,
	host: "localhost",
	user: "root",
	password: "7258768",
	database: "test"
};

app.use(helmet());

// scheduler sends application/x-www-form-urlencoded requests,
app.use(bodyParser.urlencoded({extended: true}));

// you'll need these headers if your API is deployed on a different domain than a public page
// in production system you could set Access-Control-Allow-Origin to your domains
// or drop this expression - by default CORS security is turned on in browsers
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "*");
	next();
});

// open connection to mysql
const connectionPool = mysql.createPool(mysqlConfig);
connectionPool.query = util.promisify(connectionPool.query);

const eventsStorage = new Storage(connectionPool);
schedulerRouter.setRoutes(app, "/server/events", eventsStorage);

const recurringEventsStorage = new RecurringStorage(connectionPool);
schedulerRouter.setRoutes(app, "/server/recurring_events", recurringEventsStorage);

io.on("connection", (socket) => {
	console.log("a user connected");
	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
});

io.on("connection", (socket) => {
	socket.on("chat message", (msg) => {
		msg.dateTime = new Date();
		io.emit("chat message", msg);
	});
});
