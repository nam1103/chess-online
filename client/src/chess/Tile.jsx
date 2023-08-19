import Square from "./Square";
import { UserContext } from "../UserContext";
import { MatchContext } from "../MatchContext";
import { useContext } from "react";

function Tile({ tile, offsetColor, rindex }) {
	const { currentMatch } = useContext(MatchContext);
	const { userSocket } = useContext(UserContext);
	return (
		<div className="grid grid-cols-8 gap-0 w-fit">
			{currentMatch.playerRole.white === userSocket
				? tile.map((square, index) => (
						<Square
							square={square}
							key={index}
							color={(index + offsetColor) % 2}
							rindex={rindex}
							cindex={index}
						/>
				  ))
				: tile
						.toReversed()
						.map((square, index) => (
							<Square
								square={square}
								key={index}
								color={(index + offsetColor) % 2}
								rindex={rindex}
								cindex={index}
							/>
						))}
		</div>
	);
}

export default Tile;
