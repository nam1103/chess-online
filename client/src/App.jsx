import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Register";
import { UserContextProvider } from "./UserContext";
import "react-toastify/dist/ReactToastify.css";
import Match from "./Match";
import Matches from "./Matches";
import { ToastContainer, toast } from "react-toastify";
import { MatchContextProvider } from "./MatchContext";

function App() {
	return (
		<UserContextProvider>
			<MatchContextProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Register toast={toast} />} />
						<Route path="/matches" element={<Matches toast={toast} />} />
						<Route path="/match" element={<Match toast={toast} />} />
					</Routes>
				</BrowserRouter>
			</MatchContextProvider>
			<ToastContainer />
		</UserContextProvider>
	);
}

export default App;
