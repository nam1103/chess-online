import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import FaceBook from "./assets/1.png";

function Register({ toast }) {
	const [username, setUsername] = useState("");
	const { registerUser, isRegister } = useContext(UserContext);
	const navigate = useNavigate();

	function handleRegister(e) {
		e.preventDefault();
		if (!username)
			return toast.error("Invalid username!", {
				position: "top-center",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		registerUser(username);
		toast.success("Start Playing!", {
			position: "top-center",
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: undefined,
			theme: "light",
		});
	}
	useEffect(() => {
		if (isRegister) return navigate("/matches");
	}, [isRegister]);

	return (
		<div className="h-screen relative flex items-center flex-col select-none">
			<h1 className="md:text-[300px] text-[150px] font-extralight text-[#1A1110]">
				Chess
			</h1>
			<form
				className="w-full md:max-w-[400px] max-w-[300px] flex flex-col"
				onSubmit={handleRegister}
			>
				<input
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					type="text"
					className="w-full border-2 border-[rgb(26,17,16)] rounded-lg p-2 shadow-md text-lg focus:bg-gray-200 ease-in-out duration-300"
					placeholder="username"
				/>
				<button
					className="p-2 md:px-8 px-4 w-fit self-center bg-[#1A1110]
         text-white shadow-md rounded-md mt-4 font-light text-lg hover:bg-white hover:text-[#1A1110] duration-300"
				>
					PLAY
				</button>
			</form>
			<Link
				className="fixed bottom-2 right-2"
				to={"https://www.facebook.com/nam.dinhbao.5099/"}
			>
				<img src={FaceBook} alt="" width={30} />
			</Link>
		</div>
	);
}
export default Register;
