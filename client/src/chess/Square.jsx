import { useContext, useState } from "react";
import { MatchContext } from "../MatchContext";
import { UserContext } from "../UserContext";

const color = "bg-[#f8fbf6]";
const color1 = "bg-[#98fb98]";

function Square({ square, color, rindex, cindex }) {
	const { handleClickSquare, chosenSquare, gameOverData, currentMatch } =
		useContext(MatchContext);
	const { userSocket } = useContext(UserContext);

	let isLastMove = false;

	if (currentMatch.playerRole.white === userSocket) {
		if (
			currentMatch.game.lastMove &&
			currentMatch.game.lastMove[0] === rindex &&
			currentMatch.game.lastMove[1] === cindex
		) {
			isLastMove = true;
		}
	} else {
		if (
			currentMatch.game.lastMove &&
			7 - currentMatch.game.lastMove[0] === rindex &&
			7 - currentMatch.game.lastMove[1] === cindex
		) {
			isLastMove = true;
		}
	}

	return (
		<div
			onClick={() => {
				{
					if (gameOverData.isGameOver === false) {
						handleClickSquare(rindex, cindex);
					}
				}
			}}
			role="button"
			className={`md:h-[80px] md:w-[80px] w-[50px] h-[50px] bg-gray-100 select-none ${
				JSON.stringify(chosenSquare) === JSON.stringify([rindex, cindex])
					? "bg-yellow-200"
					: isLastMove === true
					? "bg-blue-400"
					: color === 0
					? "bg-[#f8fbf6]"
					: "bg-green-200"
			}`}
		>
			{square && (
				<img
					src={`https://images.chesscomfiles.com/chess-themes/pieces/icy_sea/150/${square.color}${square.type}.png`}
					alt=""
				/>
			)}
		</div>
	);
}

export default Square;
