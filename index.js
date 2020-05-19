const app = require("express")();
app.use(express.static(__dirname));
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
const io = require("socket.io")(server);

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
