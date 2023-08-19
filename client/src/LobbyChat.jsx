import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "./UserContext";
import { MatchContext } from "./MatchContext";
import MessageBox from "./MessageBox";

function LobbyChat({ toast, setChat }) {
	const [message, setMessage] = useState("");
	const { username } = useContext(UserContext);
	const { sendMessage, messages, players, deleteMessage } =
		useContext(MatchContext);
	const messageRef = useRef(null);
	function handleSendMessage(e) {
		e.preventDefault();
		if (!message)
			return toast.error("Invalid message!", {
				position: "top-center",
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		sendMessage(message);
		toast.success("Successfully sent message!", {
			position: "top-center",
			autoClose: 1000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: undefined,
			theme: "light",
		});
		setMessage("");
	}

	useEffect(() => {
		messageRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);
	return (
		<div className="p-6 pt-3 aduration-100 shadow-xl rounded-lg w-full h-2/3 flex flex-col lg:max-w-[700px] md:max-w-[550px] max-w-[450px] bg-gray-200 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
			<h1 className="text-4xl text-center text-gray-500 font-light mb-4">
				{"-- Messages --"}
			</h1>
			<button
				className="absolute top-2 right-2 p-1 bg-gray-300 rounded-md
         shadow-sm hover:bg-red-400 hover:text-red-600 duration-100"
				onClick={() => setChat(false)}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					className="w-5 h-5"
				>
					<path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
				</svg>
			</button>
			<div className="flex-grow overflow-y-auto bg-white rounded-md shadow-lg mb-5 p-4 flex flex-col gap-4">
				{messages &&
					messages.map((message, index) => (
						<MessageBox
							key={index}
							message={message}
							handleDeleteMessage={() => deleteMessage(index)}
						/>
					))}
				<div ref={messageRef}></div>
			</div>
			<form
				action=""
				className="flex items-center"
				onSubmit={handleSendMessage}
			>
				<input
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					type="text"
					className="p-2 rounded-l-md flex-grow shadow-md"
					placeholder="Message..."
				/>
				<button className="p-[10px] duration-100 hover:bg-gray-200 hover:text-black lg:px-6 md:px-4 px-3 rounded-r-md shadow-md text-white bg-gray-500">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						className="w-5 h-5"
					>
						<path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
					</svg>
				</button>
			</form>
		</div>
	);
}

export default LobbyChat;
