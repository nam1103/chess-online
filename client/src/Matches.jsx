import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import { MatchContext } from "./MatchContext";
import ChessIcon from "./assets/chessboardicon.png";
import LobbyChat from "./LobbyChat";

function Matches({ toast }) {
	const navigate = useNavigate();
	const [isCreate, setIsCreate] = useState(false);
	const [roomName, setRoomName] = useState("");
	const [time, setTime] = useState("10");
	const { createMatch, matches, players, isPlay, joinMatch, currentMatch } =
		useContext(MatchContext);
	const { username, logoutUser, isRegister } = useContext(UserContext);
	const [isChat, setIsChat] = useState(false);

	useEffect(() => {
		if (!isRegister) return navigate("/");
	}, [isRegister]);

	useEffect(() => {
		if (isPlay) return navigate("/match");
	}, [isPlay]);

	function handleCreateMatch(e) {
		e.preventDefault();
		setRoomName("");
		setTime("10");
		if (roomName.length > 20)
			return toast.error("Room Name musn't be longer than 20 characters!", {
				position: "top-center",
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
				theme: "light",
			});

		if (Object.keys(matches).includes(roomName))
			return toast.error("Room with this name has already existed!", {
				position: "top-center",
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
				theme: "light",
			});

		if (!roomName)
			return toast.error("Invalid Room Name!", {
				position: "top-center",
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		toast.success("Room Created!", {
			position: "top-center",
			autoClose: 1000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: undefined,
			theme: "light",
		});
		createMatch({ roomName, timeOption: time });
		setIsCreate(false);
	}

	return (
		<div className={`relative flex h-screen flex-col select-none`}>
			<nav className="relative min-h-[55px] flex py-2 lg:px-20 md:px-10 px-4 w-full bg-gray-500 justify-between items-center">
				<div className="flex items-center gap-4">
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
				<span className="text-gray-200 font-light flex items-center gap-2">
					{players && Object.keys(players).length} Online
					<div className="rounded-full w-2 h-2 bg-green-400"></div>
				</span>
				<div className="flex gap-4 items-center">
					<span className="flex text-white items-center gap-1 text-2xl">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-8 h-8"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
							/>
						</svg>
						{username}
					</span>
					<button
						onClick={logoutUser}
						className="bg-white p-2 rounded-md shadow-md hover:text-white hover:bg-[#1A1110] duration-100"
					>
						Leave
					</button>
				</div>
			</nav>
			<div className="pb-20 overflow-y-auto grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6 mt-4 md:px-20 lg:px-32 px-10 duration-300">
				{matches &&
					Object.keys(matches).map((matchName, index) => (
						<div key={index} className="relative rounded-lg">
							<div className="rounded-t-2xl p-2 text-center bg-gray-200 shadow-xl">
								<span className="text-sm text-gray-500 absolute top-2 left-2">
									{index + 1}
								</span>
								<span className="w-full break-words text-2xl font-bold p-2 text-gray-500">
									{matchName}
								</span>
							</div>
							<div className="w-full p-10 pb-2 pt-2 bg-gray-100 shadow-xl flex flex-col rounded-b-md">
								<span className="flex gap-1 self-center items-center mb-3">
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
											d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
										/>
									</svg>

									{players && players[matches[matchName].hostId].username}
								</span>
								<img
									src={ChessIcon}
									alt=""
									className="object-contain w-full rounded-md mb-3"
								/>
								<div className="flex items-center justify-between">
									<span className="flex items-center text-lg">
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
												d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
											/>
										</svg>
										{matches[matchName].timeOption}
									</span>
									<button
										disabled={matches[matchName].players.length > 1}
										onClick={() => joinMatch(matchName)}
										className="bg-gray-400 rounded-md shadow-md
									 w-fit p-2 px-4 self-center hover:bg-white duration-150 hover:text-black text-gray-200"
									>
										{matches[matchName].players.length > 1 ? "Full" : "Play"}
									</button>
								</div>
							</div>
						</div>
					))}
			</div>

			{!isCreate ? (
				<button
					onClick={() => setIsCreate((prev) => !prev)}
					className="hover:bg-[#1A1110] duration-200 hover:text-white text-gray-400 group
			 fixed bg-gray-200 shadow-md rounded-lg flex gap-2 items-center md:px-32 px-20 py-5 left-1/2 bottom-20 transform -translate-x-1/2"
				>
					<span className="text-4xl font-light">CREATE</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-10 h-10"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 4.5v15m7.5-7.5h-15"
						/>
					</svg>
				</button>
			) : (
				<form
					onSubmit={handleCreateMatch}
					autoComplete="off"
					action=""
					className="w-full md:max-w-[500px] max-w-[350px] fixed left-1/2 flex flex-col p-10
					 transform -translate-x-1/2 -translate-y-1/2 top-1/2 bg-gray-200 rounded-lg shadow-xl"
				>
					<button
						className="absolute w-fit right-2 top-2 bg-gray-300 text-gray-400 rounded-md p-1
						 shadow-sm hover:bg-red-200 duration-100 hover:text-red-400"
						onClick={() => setIsCreate(false)}
						type="button"
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
					<h1 className="text-gray-500 text-4xl font-light text-center mb-5">
						New Room
					</h1>
					<label htmlFor="roomname" className="text-xl text-gray-400">
						Room Name
					</label>
					<input
						value={roomName}
						onChange={(e) => setRoomName(e.target.value)}
						id="roomname"
						placeholder="Room Name"
						className={`border p-2 rounded-md shadow-md mb-5 ${
							roomName.length > 20 && "border-red-600"
						}`}
					/>
					<label htmlFor="timeoptions" className="text-xl text-gray-400">
						Time Options
					</label>
					<div className="w-full flex justify-between">
						<select
							value={time}
							onChange={(e) => setTime(e.target.value)}
							className="outline-none p-2 rounded-md text-center w-1/2 shadow-md"
							id="timeoptions"
						>
							<option value="15">15</option>
							<option value="10">10</option>
							<option value="5">5</option>
							<option value="3">3</option>
							<option value="3|2">3|2</option>
						</select>
						<div className="flex-grow flex justify-center">
							<button className="w-fit px-4 bg-gray-400 rounded-md shadow-md hover:bg-[#1A1110] hover:text-white hover:px-6 duration-100">
								Create
							</button>
						</div>
					</div>
				</form>
			)}
			{isChat && <LobbyChat setChat={setIsChat} toast={toast} />}
		</div>
	);
}

export default Matches;
