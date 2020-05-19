const app = require("express")();
app.use(express.static(__dirname));
app.set("port", process.env.PORT || 3000);
const server = app.listen(app.get("port"), () => {
	console.log("listening on port ", server.address().port);
});
const io = require("socket.io")(server);

app.get("/", (req, res) => {
	res.sendFile(`${__dirname}/index.html`);
});

app.get("/style.css", (req, res) => {
	res.sendFile(`${__dirname}/style.css`);
});

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
