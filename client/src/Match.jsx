import { useContext, useEffect, useState } from "react";
import { MatchContext } from "./MatchContext";
import { useNavigate } from "react-router-dom";
import Board from "./chess/Board";
import Loading from "./assets/loading.gif";

function Match({ toast }) {
	const {
		isPlay,
		currentMatch,
		players,
		error,
		setError,
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
	} = useContext(MatchContext);
	const [isChat, setIsChat] = useState(false);
	const navigate = useNavigate();
	useEffect(() => {
		if (!isPlay) return navigate("/matches");
	}, [isPlay]);

	useEffect(() => {
		if (!error) return;
		toast.error(error.msg, {
			position: "top-center",
			autoClose: 1000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: undefined,
			theme: "light",
		});
		setError(null);
	}, [error]);
	return (
		<div className="flex relative flex-col h-screen">
			{currentMatch && (
				<>
					<nav className="select-none bg-gray-400 py-2 flex justify-between items-center lg:px-40 md:px-32 px-8">
						{currentMatch && currentMatch.players.length === 2 ? (
							<>
								<div className="flex gap-4 place-items-center">
									<span className="text-3xl font-light text-white">Chess</span>
									<button
										className="text-white"
										onClick={() => setIsChat((prev) => !prev)}
									>
										{isChat ? (
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="currentColor"
												className="w-7 h-7"
											>
												<path
													fillRule="evenodd"
													d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z"
													clipRule="evenodd"
												/>
											</svg>
										) : (
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="w-7 h-7"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
												/>
											</svg>
										)}
									</button>
								</div>

								<div className="flex items-center rounded-md shadow-lg">
									<button
										disabled={!isDrawCoolDown}
										onClick={offerDraw}
										className={`flex items-center ${
											isDrawCoolDown
												? "bg-green-400 hover:bg-green-500  hover:text-green-700"
												: "bg-gray-300"
										} text-lg
									 gap-1 p-1 rounded-l-md font-light text-gray-700 duration-100`}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-5 h-5"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002"
											/>
										</svg>
										Draw
									</button>
									<button
										onClick={resign}
										className="gap-1 flex items-center bg-red-400 p-1 px-2
									 text-lg font-light text-gray-700 rounded-r-md hover:bg-red-500 duration-100 hover:text-red-800"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-6 h-6"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
											/>
										</svg>
										Resign
									</button>
								</div>
							</>
						) : (
							<span className="text-white text-lg w-full text-center">
								Waiting for player to join ...
							</span>
						)}
					</nav>
					<div
						className={`flex-grow flex flex-col items-center ${
							currentMatch.players.length < 2 && "justify-center"
						}`}
					>
						{currentMatch.players.length === 2 ? (
							<>
								<div className="mt-6 mb-6 flex items-center gap-10">
									<span
										className={`flex items-center p-2 ${
											currentMatch.playerTurn === currentMatch.playerRole.white
												? "bg-yellow-300"
												: "bg-gray-400"
										} rounded-md
								 text-white text-lg shadow-lg`}
									>
										<img
											className="w-8"
											src="https://images.chesscomfiles.com/chess-themes/pieces/icy_sea/150/wp.png"
											alt=""
										/>
										{players[currentMatch.playerRole.white]?.username}
									</span>
									<span className="text-4xl font-extralight">VS</span>
									<span
										className={`flex items-center p-2 ${
											currentMatch.playerTurn === currentMatch.playerRole.black
												? "bg-yellow-300"
												: "bg-gray-400"
										} rounded-md
								 text-white text-lg shadow-lg`}
									>
										<img
											className="w-8"
											src="https://images.chesscomfiles.com/chess-themes/pieces/icy_sea/150/bp.png"
											alt=""
										/>
										{players[currentMatch.playerRole.black]?.username}
									</span>
								</div>
								<Board board={currentMatch.game.board} />
							</>
						) : (
							<>
								<img src={Loading} alt="" className="w-20" />
								<button
									onClick={stopWaiting}
									className="p-2 bg-red-500 mt-5 rounded-md text-white shadow-md"
								>
									Leave Game
								</button>
							</>
						)}
					</div>
					{isOfferDraw && gameOverData.isGameOver === false && (
						<div className="gap-2 shadow-2xl flex flex-col fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/3 bg-gray-200 p-6 rounded-md">
							<h1 className="text-4xl">Draw Offer</h1>
							<span className="text-gray-700">
								<b>{players[userOfferDraw].username}</b> is offering a draw!
							</span>
							<span className="text-sm text-center text-gray-500">
								Auto close in 10s
							</span>
							<button
								onClick={acceptDraw}
								className="p-2 hover:px-6 duration-300 text-green-600 bg-green-200 rounded-md shadow-lg w-fit px-4 self-center"
							>
								Accept
							</button>
							<button
								onClick={disableDraw}
								className="absolute right-2 top-2 bg-gray-300 rounded-md shadow-md hover:bg-red-300 hover:text-red-500 duration-300"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>
					)}
					{gameOverData.isGameOver === true && (
						<div className="shadow-lg flex flex-col min-w-[400px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/3">
							<div
								className={`${
									gameOverData.status === "Draw"
										? "bg-gray-400 text-gray-700"
										: gameOverData.status === "Victory"
										? "bg-green-400 text-green-700"
										: "bg-red-400 text-red-700"
								} p-5 rounded-t-3xl text-center text-4xl`}
							>
								{gameOverData.status}
							</div>
							<div className="flex gap-4 flex-col bg-gray-100 pt-5 pb-10">
								<span className="self-center text-2xl ">
									{gameOverData.reason}
								</span>
								<button
									onClick={leaveGame}
									className="flex gap-1 items-center bg-gray-500 text-gray-200 rounded-full self-center p-2 px-4 w-fit hover:text-gray-600 hover:bg-gray-300 duration-150"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-6 h-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
										/>
									</svg>
									Leave Game
								</button>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
}

export default Match;
