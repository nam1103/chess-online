const express = require("express");
const { Server } = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const { Chess, Piece } = require("./game");

const io = new Server(server, {
	cors: {
		origin: "*",
		methods: ["POST", "GET"],
	},
});

const players = {};
const matches = {};
const messages = [];

function initMatch(matchName, timeOption, hostId) {
	matches[matchName] = {
		timeOption,
		messages: [],
		hostId,
		players: [hostId],
		playerRole: { white: hostId, black: null },
		playerTurn: hostId,
		roleTurn: "white",
		game: new Chess(),
	};
}

function closeMatch(matchName, data, io) {
	delete matches[matchName];
	io.in(matchName).emit("match-ended", data);
	io.emit("get-matches", matches);
}

function addMessage(message) {
	if (messages.length >= 150) {
		messages.shift();
	}
	messages.push({ ...message, time: new Date() });
	io.emit("get-messages", messages);
}

io.on("connection", (socket) => {
	socket.on("new-user", (username) => {
		players[socket.id] = { username };
		socket.emit("get-id", socket.id);
		socket.emit("get-matches", matches);
		socket.emit("get-messages", messages);
		io.emit("get-players", players);
	});

	socket.on("offer-draw", (matchName) => {
		const currentMatch = matches[matchName];
		if (socket.id == currentMatch.playerRole.white) {
			socket.to(currentMatch.playerRole.black).emit("offer-draw", socket.id);
		} else {
			socket.to(currentMatch.playerRole.white).emit("offer-draw", socket.id);
		}
	});

	socket.on("accept-draw", (matchName) => {
		closeMatch(
			matchName,
			{
				status: "Draw",
				reason: `Draw by acceptance!`,
			},
			io
		);
	});

	socket.on("leave-ended-game", () => {});

	socket.on("send-message", (message) => {
		addMessage({ message, senderId: socket.id });
	});

	socket.on("delete-message", (index) => {
		if (!messages[index].senderId === socket.id) return;
		messages.splice(index, 1);
		io.emit("get-messages", messages);
	});

	socket.on("resign", (matchName) => {
		const currentMatch = matches[matchName];

		let playerWin;
		if (socket.id !== currentMatch.playerRole.white) {
			playerWin = currentMatch.playerRole.white;
		} else {
			playerWin = currentMatch.playerRole.black;
		}

		delete matches[matchName];
		socket.emit("match-ended", {
			status: "Lost",
			reason: "By Resignation",
		});
		socket.to(playerWin).emit("match-ended", {
			status: "Victory",
			reason: "By resignation",
		});

		io.emit("get-matches", matches);
	});

	socket.on("make-move", (data) => {
		const error = matches[data.matchName].game.makeMove(data.from, data.to);
		if (error === true) {
			socket.emit("move-error", { msg: "Invalid move!" });
		} else {
			if (matches[data.matchName].roleTurn === "white") {
				matches[data.matchName].roleTurn = "black";
			} else {
				matches[data.matchName].roleTurn = "white";
			}
			if (socket.id === matches[data.matchName].players[0]) {
				matches[data.matchName].playerTurn = matches[data.matchName].players[1];
			} else {
				matches[data.matchName].playerTurn = matches[data.matchName].players[0];
			}
			io.in(data.matchName).emit("get-current-match", matches[data.matchName]);
			if (error === "game-over") {
				const currentMatch = matches[data.matchName];
				let playerWin;
				let playerLose;
				if (currentMatch.playerTurn !== currentMatch.playerRole.white) {
					playerWin = currentMatch.playerRole.white;
					playerLose = currentMatch.playerRole.black;
				} else {
					playerWin = currentMatch.playerRole.black;
					playerLose = currentMatch.playerRole.white;
				}

				delete matches[data.matchName];
				io.emit("get-matches", matches);

				socket.emit("match-ended", {
					status: "Victory",
					reason: "Take the king as a gift!",
				});
				socket.to(playerLose).emit("match-ended", {
					status: "Lost",
					reason: "Where is your king?",
				});
			}
		}
	});

	socket.on("new-match", (data) => {
		const { roomName, timeOption } = data;
		initMatch(roomName, timeOption, socket.id);
		io.emit("get-matches", matches);
		socket.join(roomName);
		io.in(roomName).emit("get-current-match", matches[roomName]);
	});

	socket.on("leave-game", () => {
		socket.emit("get-matches", matches);
		socket.emit("get-players", players);
	});

	socket.on("join-match", (matchName) => {
		matches[matchName].players.push(socket.id);
		matches[matchName].playerRole.black = socket.id;
		socket.join(matchName);
		io.in(matchName).emit("get-current-match", matches[matchName]);
		io.in(matchName).emit("game-start");
		io.emit("get-matches", matches);
	});

	socket.on("stop-wait", (matchName) => {
		delete matches[matchName];
		io.emit("get-matches", matches);
	});

	socket.on("disconnect", () => {
		for (const matchName in matches) {
			if (matches[matchName].players.includes(socket.id)) {
				closeMatch(
					matchName,
					{
						status: "Victory",
						reason: `${players[socket.id].username} disconnected!`,
					},
					io
				);
			}
		}
		delete players[socket.id];
		io.emit("get-players", players);
	});
});
server.listen(3000);
