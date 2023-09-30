import { useEffect, useState } from "react";
import "./App.css";

const tiles = [
	{ id: 1 },
	{ id: 2 },
	{ id: 3 },
	{ id: 4 },
	{ id: 5 },
	{ id: 6 },
	{ id: 7 },
	{ id: 8 },
	{ id: 9 },
];

function App() {
	const [activePlayer, setActivePlayer] = useState("X");
	const [activeDisplay, setActiveDisplay] = useState("Current player: X");
	const [winner, setWinner] = useState(null);
	const [gameOver, setGameOver] = useState(false);

	useEffect(() => {
		checkDraw();
		checkWinner();
	}, [activePlayer]);

	const handleClick = (e) => {
		if (e.target.innerText !== "") return;
		e.target.innerText = activePlayer;
		setActivePlayer(activePlayer === "X" ? "O" : "X");
		setActiveDisplay(`Current player: ${activePlayer === "X" ? "O" : "X"}`);
	};

	const handleReset = () => {
		const tiles = document.querySelectorAll(".tile");
		tiles.forEach((tile) => {
			tile.innerText = "";
		});
		setActivePlayer("X");
		setActiveDisplay("Current player: X");
		setWinner(null);
		setGameOver(false);
	};

	const checkWinner = () => {
		const winningCombos = [
			["1", "2", "3"],
			["4", "5", "6"],
			["7", "8", "9"],
			["1", "4", "7"],
			["2", "5", "8"],
			["3", "6", "9"],
			["1", "5", "9"],
			["3", "5", "7"],
		];
		const tiles = document.querySelectorAll(".tile");
		winningCombos.forEach((combo) => {
			const tile1 = tiles[combo[0] - 1].innerText;
			const tile2 = tiles[combo[1] - 1].innerText;
			const tile3 = tiles[combo[2] - 1].innerText;
			if (tile1 === tile2 && tile2 === tile3 && tile1 !== "") {
				setWinner(`${tile1} wins!`);
				setGameOver(true);
				setActiveDisplay("");
			}
		});
	};

	const checkDraw = () => {
		const tiles = document.querySelectorAll(".tile");
		let count = 0;
		tiles.forEach((tile) => {
			if (tile.innerText !== "") {
				count++;
			}
		});
		if (count === 9) {
			setWinner("Draw!");
			setGameOver(true);
			setActiveDisplay("");
		}
	};

	return (
		<>
			<div id='heading-wrapper'>
				<h1>Tic Tac Toe!</h1>
				<p>{activeDisplay}</p>
			</div>
			<div className='board grid'>
				{tiles.map((tile) => {
					return (
						<div
							className='tile'
							key={tile.id}
							id={tile.id}
							onClick={!gameOver ? (e) => handleClick(e) : () => {}}
						></div>
					);
				})}
			</div>
			<button id='reset-button' onClick={() => handleReset()}>
				Reset
			</button>
			<p id='winner'>{winner}</p>
		</>
	);
}

export default App;
