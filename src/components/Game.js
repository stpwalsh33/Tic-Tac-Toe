import React from "react";
import Board from "./Board";
import { checkWinner } from "../utils/checkWinner";
import PlayAgain from "./PlayAgain";
import PropTypes from "prop-types";

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			history: [
				{
					squares: Array(9).fill(null)
				}
			],
			stepNumber: 0,
			xIsNext: true,
			gameType: props.gameType
		};
	}

	handleClick(i) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();
		if (checkWinner(squares) || squares[i]) {
			return;
		}
		squares[i] = this.state.xIsNext ? "X" : "O";
		this.setState({
			history: history.concat([
				{
					squares: squares
				}
			]),
			stepNumber: history.length,
			xIsNext: !this.state.xIsNext
		});
	}
	
	outOfMoves(currentBoard) {
		const status = currentBoard.squares.filter(square => square === null);
		if (status.length === 0) {
			return true;
		}
		return false;
	}
	render() {
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const winner = checkWinner(current.squares);
		const isOutOfMoves = this.outOfMoves(current);
		const gameStatus =
			isOutOfMoves && !winner ? "Draw" : winner ? winner : "Still playing";
		return (
			<div className="game">
				<div className="game-board">
					{gameStatus !== "Still playing" ? (
						<PlayAgain
							onClick={() => this.props.startNewGame()}
							gameStatus={gameStatus}
						/>
					) : (
						<Board
							squares={current.squares}
							onClick={i => this.handleClick(i)}
						/>
					)}
				</div>
			</div>
		);
	}
}

Game.propTypes = {
	gameType: PropTypes.string,
	startNewGame: PropTypes.func
};

export default Game;
