import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const MatchContext = createContext();
let isInGame = false;

export function MatchContextProvider({ children }) {
	const { socket, username, userSocket } = useContext(UserContext);
	const [isPlay, setIsPlay] = useState(false);
	const [matches, setMatches] = useState(null);
	const [players, setPlayers] = useState(null);
	const [messages, setMessages] = useState(null);
	const [currentMatch, setCurrentMatch] = useState(null);
	const [chosenSquare, setChosenSquare] = useState(null);
	const [currentMatchName, setCurrentMatchName] = useState(null);
	const [error, setError] = useState(null);
	const [isOfferDraw, setIsOfferDraw] = useState(false);
	const [userOfferDraw, setUserOfferDraw] = useState(null);
	const [isDrawCoolDown, setIsDrawCoolDown] = useState(true);
	const [gameOverData, setGameOverData] = useState({
		isGameOver: false,
	});

	function disableDraw() {
		setIsOfferDraw(false);
		setUserOfferDraw(null);
	}

	function createMatch(data) {
		socket.emit("new-match", data);
		setCurrentMatchName(data.roomName);
	}

	function joinMatch(matchName) {
		socket.emit("join-match", matchName);
		setCurrentMatchName(matchName);
	}

	function sendMessage(message) {
		socket.emit("send-message", message);
	}

	function deleteMessage(index) {
		socket.emit("delete-message", index);
	}

	function connectMatch() {
		setIsPlay(true);
	}

	function resign() {
		socket.emit("resign", currentMatchName);
	}

	function leaveGame() {
		setIsDrawCoolDown(true);
		setGameOverData({ isGameOver: false });
		setCurrentMatchName(null);
		setIsPlay(false);
		isInGame = false;
		setCurrentMatch(null);
		socket.emit("leave-game");
	}

	function handleClickSquare(row, col) {
		if (currentMatch.players.length !== 2) return;
		if (currentMatch.playerTurn !== userSocket) return;
		if (JSON.stringify(chosenSquare) === JSON.stringify([row, col])) {
			setChosenSquare(null);
		} else {
			if (chosenSquare) {
				if (currentMatch.playerRole.white === userSocket) {
					socket.emit("make-move", {
						from: chosenSquare,
						to: [row, col],
						matchName: currentMatchName,
					});
				} else {
					socket.emit("make-move", {
						from: [7 - chosenSquare[0], 7 - chosenSquare[1]],
						to: [7 - row, 7 - col],
						matchName: currentMatchName,
					});
				}
				setChosenSquare(null);
			} else {
				if (currentMatch.playerRole.white === userSocket) {
					if (currentMatch.game.board[row][col] === null) return;
					if (
						currentMatch.game.board[row][col].color !== currentMatch.roleTurn[0]
					)
						return;
				} else {
					if (currentMatch.game.board[7 - row][7 - col] === null) return;
					if (
						currentMatch.game.board[7 - row][7 - col].color !==
						currentMatch.roleTurn[0]
					)
						return;
				}

				setChosenSquare([row, col]);
			}
		}
	}

	function offerDraw() {
		if (isDrawCoolDown) {
			socket.emit("offer-draw", currentMatchName);
			setIsDrawCoolDown(false);
			setTimeout(() => {
				setIsDrawCoolDown(true);
			}, 60000);
		}
	}

	function acceptDraw() {
		disableDraw();
		socket.emit("accept-draw", currentMatchName);
	}

	function stopWaiting() {
		socket.emit("stop-wait", currentMatchName);
		setIsDrawCoolDown(true);
		setGameOverData({ isGameOver: false });
		setCurrentMatchName(null);
		setIsPlay(false);
		isInGame = false;
		setCurrentMatch(null);
	}

	useEffect(() => {
		if (!socket) return;
		socket.on("game-start", () => {
			isInGame = true;
		});
		socket.on("get-current-match", (roomData) => {
			setCurrentMatch(roomData);
			if (!isPlay) {
				connectMatch();
			}
		});
		socket.on("offer-draw", (usersocket) => {
			setUserOfferDraw(usersocket);
			setIsOfferDraw(true);
			setTimeout(() => {
				setUserOfferDraw(null);
				setIsOfferDraw(false);
			}, 10000);
		});
		socket.on("match-ended", (data) => {
			setGameOverData({ isGameOver: true, ...data });
		});
		socket.on("get-messages", (messagesData) => setMessages(messagesData));
		socket.on("get-matches", (matchesData) => {
			if (isInGame === false) {
				setMatches(matchesData);
			}
		});
		socket.on("get-players", (playersData) => {
			if (isInGame === false) {
				setPlayers(playersData);
			}
		});
		socket.on("move-error", (error) => {
			setError(error);
		});
		return () => {
			socket.off("match-ended");
			socket.off("get-matches");
			socket.off("get-players");
			socket.off("get-messages");
			socket.off("get-current-match");
			socket.off("move-error");
			socket.off("offer-draw");
		};
	}, [socket]);

	return (
		<MatchContext.Provider
			value={{
				error,
				setError,
				chosenSquare,
				createMatch,
				matches,
				players,
				sendMessage,
				messages,
				deleteMessage,
				isPlay,
				joinMatch,
				currentMatch,
				handleClickSquare,
				offerDraw,
				isOfferDraw,
				userOfferDraw,
				disableDraw,
				isDrawCoolDown,
				acceptDraw,
				gameOverData,
				leaveGame,
				resign,
				stopWaiting,
			}}
		>
			{children}
		</MatchContext.Provider>
	);
}
