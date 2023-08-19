import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
	const [isRegister, setIsRegister] = useState(false);
	const [userSocket, setUserSocket] = useState(null);
	const [socket, setSocket] = useState(null);
	const [username, setUsername] = useState(null);

	function registerUser(username) {
		setUsername(username);
		socket.emit("new-user", username);
	}

	function logoutUser() {
		setUsername(null);
		setIsRegister(false);
	}

	useEffect(() => {
		const newSocket = io("http://localhost:3000");
		setSocket(newSocket);
		return () => {
			newSocket.disconnect();
		};
	}, []);

	useEffect(() => {
		if (!socket) return;
		socket.on("get-id", (id) => {
			setUserSocket(id);
			setIsRegister(true);
		});
		return () => socket.off("get-id");
	}, [socket]);

	return (
		<UserContext.Provider
			value={{
				registerUser,
				isRegister,
				socket,
				username,
				userSocket,
				logoutUser,
			}}
		>
			{children}
		</UserContext.Provider>
	);
}
