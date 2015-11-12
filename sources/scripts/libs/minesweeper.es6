import Enum from "./enum.es6";


let random = lim => Math.floor(Math.random() * (lim + 1));


export const GameStatus =
	Enum `
		NOT_AVAILABLE
		STANDBY
		PENDING
		PAUSED
		COMPLETE
	`

export const GameOverStatus =
	Enum `
		NOT_AVAILABLE
		SUCCESS
		FAIL
	`

export class Minesweeper {
	constructor() {
		this.status = GameStatus.NOT_AVAILABLE;
		this.score = GameOverStatus.NOT_AVAILABLE;

		this.battlefield = null;
		this.mines = null;
		this.rows = null;
		this.columns = null;

		this._times = null;
		this._unchecked = null;
	}

	initialize(rows, columns, mines) {
		this.mines = mines;
		this.rows = rows;
		this.columns = columns;

		this.battlefield = new Battlefield(rows, columns);

		this._unchecked = rows * columns;
		this._times = [];

		this.score = GameOverStatus.NOT_AVAILABLE;
		this.status = GameStatus.STANDBY;
	}

	check(row, column) {
		if (this.status == GameStatus.STANDBY)
			this._setUpBombs(row, column);

		if (this.status != GameStatus.PENDING)
			return;

		let item = this.battlefield.get(row, column);

		if (item.checked || item.hasFlag) return;

		item.checked = true;

		this._unchecked -= 1;

		if (this._unchecked <= this.mines) {
			this._gameComplete(GameOverStatus.SUCCESS);
		}

		if (item.hasMine) {
			item.blowUp = true;

			this._gameComplete(GameOverStatus.FAIL);
		} else {
			let arroundMinesCount = 0;
			let checkItem = item => {
				if (item.hasMine) arroundMinesCount++;
			};

			this._forAllArround(row, column, checkItem);

			item.minesArround = arroundMinesCount;

			if (item.minesArround == 0) {
				let checkItem = item => {
					this.check(item.row, item.column);
				};

				this._forAllArround(row, column, checkItem);
			}
		}
	}

	setFlag(row, column) {
		let item = this.battlefield.get(row, column);

		if (item.checked) return;
		
		item.hasFlag = !item.hasFlag;
	}

	checkAllArroundMinesFlagged(row, column) {
		if (this.status != GameStatus.PENDING)
			return;

		let item = this.battlefield.get(row, column);

		if (item.checked && item.minesArround) {
			let count = 0;
			let flagChecker = item => {
				if (item.hasFlag) count++;
			};

			this._forAllArround(row, column, flagChecker);

			if (item.minesArround == count) {
				let checkCell = item => {
					if (item.checked) return;
					if (item.hasMine && item.hasFlag) return;

					this.check(item.row, item.column);
				};

				this._forAllArround(row, column, checkCell);
			}
		}
	}

	pause() {
		if (this.status != GameStatus.PENDING)
			return;

		this.status = GameStatus.PAUSED;
		this._times.push(new Date);
	}

	resume() {
		if (this.status != GameStatus.PAUSED)
			return;

		this.status = GameStatus.PENDING;
		this._times.push(new Date);
	}

	getGameTime() {
		if (!this._times || this._times.length == 0)
			return { seconds: 0, milliseconds: 0 };

		let time = 0;
		let times = this._times;

		for (let i = 0, lim = times.length; i < lim; i += 2) {
			let startTime = times[i];
			let endTime = times[i + 1] || new Date;
			time += endTime - startTime;
		}

		let milliseconds = time % 1000;
		let seconds = (time - milliseconds) / 1000;

		return { seconds, milliseconds };
	}

	_setUpBombs(row, column) {
		let mines = 0;

		while (mines < this.mines) {
			let [i, j] = [random(+this.rows - 1), random(+this.columns - 1)];

			if (i == row && j == column) continue;

			let item = this.battlefield.get(i, j);

			if (item.hasMine) continue;

			item.hasMine = true;

			mines++;
		}

		this._times.push(new Date);
		this.status = GameStatus.PENDING;
	}

	_forAllArround(row, column, callback) {
		let invokeIfExists = (row, column) => {
			let item = this.battlefield.get(row, column);
			if (item) callback(item);
		};

		invokeIfExists(row - 1, column - 1);
		invokeIfExists(row - 1, column);
		invokeIfExists(row - 1, column + 1);

		invokeIfExists(row, column - 1);
		invokeIfExists(row, column);
		invokeIfExists(row, column + 1);

		invokeIfExists(row + 1, column - 1);
		invokeIfExists(row + 1, column);
		invokeIfExists(row + 1, column + 1);
	}

	_gameComplete(score) {
		for (let row = 0; row < this.rows; row++) {
			for (let column = 0; column < this.columns; column++) {
				let item = this.battlefield.get(row, column);

				if (item.checked || item.hasFlag) continue;

				// TODO bugfix: открываются не все клетки
				if (item.hasMine) {
					item.checked = true;
				}
			}
		}

		this.score = score;
		this.status = GameStatus.COMPLETE;
	}
}

class Battlefield {
	constructor(rows, columns) {
		this.grid = [];

		for (let row = 0; row < rows; row++) {
			this.grid[row] = [];

			for (let column = 0; column < columns; column++) {
				this.grid[row][column] = {
					row, column,
					checked: false,
					hasMine: false,
					hasFlag: false,
					minesArround: 0,
					blowUp: false
				};
			}
		}
	}

	get(row, column) {
		let line = this.grid[row];

		return line ? line[column] : null;
	}

	set(row, column, value) {
		this.grid[row][column] = value;
	}
	
	forAllArround(row, column, callback) {
		let invokeIfExists = (row, column) => {
			let item = this.get(row, column);
			if (item) callback(item);
		};

		invokeIfExists(row - 1, column - 1);
		invokeIfExists(row - 1, column);
		invokeIfExists(row - 1, column + 1);

		invokeIfExists(row, column - 1);
		invokeIfExists(row, column);
		invokeIfExists(row, column + 1);

		invokeIfExists(row + 1, column - 1);
		invokeIfExists(row + 1, column);
		invokeIfExists(row + 1, column + 1);
	}
}