import { useContext } from "react";
import Square from "./Square";
import Tile from "./Tile";
import { MatchContext } from "../MatchContext";
import { UserContext } from "../UserContext";

function Board({ board }) {
	const { currentMatch } = useContext(MatchContext);
	const { userSocket } = useContext(UserContext);
	return (
		<div className="flex flex-col w-fit shadow-2xl">
			{currentMatch.playerRole.white === userSocket
				? board.map((tile, index) => (
						<Tile
							key={index}
							tile={tile}
							offsetColor={index % 2}
							rindex={index}
						/>
				  ))
				: board
						.toReversed()
						.map((tile, index) => (
							<Tile
								key={index}
								tile={tile}
								offsetColor={index % 2}
								rindex={index}
							/>
						))}
		</div>
	);
}

export default Board;
