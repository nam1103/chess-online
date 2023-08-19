import { useContext, useState } from "react";
import { MatchContext } from "./MatchContext";
import { UserContext } from "./UserContext";
import moment from "moment";

function MessageBox({ message, handleDeleteMessage }) {
	const { players } = useContext(MatchContext);
	const { userSocket } = useContext(UserContext);
	const [isConfig, setIsConfig] = useState(false);

	return (
		<div className="relative w-full bg-gray-300 rounded-lg shadow-lg flex flex-col p-2 gap-2">
			{userSocket === message.senderId && (
				<button
					className="absolute top-1 right-0 hover:text-white text-gray-700"
					onClick={() => setIsConfig((prev) => !prev)}
				>
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
							d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
						/>
					</svg>
				</button>
			)}

			{isConfig && (
				<div className="absolute right-0 top-10 bg-white p-2 rounded-lg shadow-lg">
					<button
						onClick={() => {
							handleDeleteMessage();
							setIsConfig(false);
						}}
						className="hover:bg-gray-500 rounded-lg p-1 hover:text-white duration-300"
					>
						Delete
					</button>
				</div>
			)}
			<div className="flex w-full justify-between pr-20 items-center">
				<span className="text-3xl text-gray-700 font-bold">
					{players[message.senderId]?.username}
				</span>
				<span className="text-sm text-light text-gray-500">
					{moment(message.time).calendar()}
				</span>
			</div>

			<span className="w-full break-words text-xl text-gray-600">
				{message?.message}
			</span>
		</div>
	);
}

export default MessageBox;
