import React from "react";
import Game from "./Game";

const TicTacToe = () => {
	const [gameId, setGameId] = React.useState(1);

	return (
		<Game
			key={gameId}
			startNewGame={() => setGameId(gameId + 1)}
		/>
	);
};

export default TicTacToe;
