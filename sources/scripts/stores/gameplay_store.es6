import Store from "../libs/store.es6";
import { Minesweeper, GameStatus, GameOverStatus } from "../libs/minesweeper.es6";
import { appActions } from "../actions/app_actions.es6";
import { gameplayActions } from "../actions/gameplay_actions.es6";
import Enum from "../libs/enum.es6";


class GameplayStoreClass extends Store {
	constructor() {
		super();

		this.game = new Minesweeper;
		this.payload = {
			rows: null,
			columns: null,
			mines: null,
			cells: null,
			status: this.game.status,
			score: this.game.score
		};
	}

	updatePayload() {
		this.payload.status = this.game.status;
		this.payload.score = this.game.score;

		return super.updatePayload();
	}

	update(action) {
		switch (action.type) {
			case appActions.START_GAME:
				if (action.difficult == Difficult.EASY)
					this._initialize(9, 9, 10);
				if (action.difficult == Difficult.NORMAL)
					this._initialize(16, 16, 40);
				if (action.difficult == Difficult.HARD)
					this._initialize(16, 30, 99);
				break;
			
			case appActions.RESTART_GAME:
				this._initialize(this.game.rows, this.game.columns, this.game.mines);
				break;
			
			case appActions.TO_MAIN_MENU:
				this.game.pause();
				break;
			
			case appActions.CONTINUE_GAME:
				this.game.resume();
				break;
			
			case gameplayActions.CHECK_CELL:
				this.game.check(action.row, action.column);

				if (this.game.score == GameOverStatus.FAIL) {
					this.game.battlefield.get(action.row, action.column).blowUp = true;
				}

				break;
			
			case gameplayActions.SET_FLAG:
				this.game.setFlag(action.row, action.column);
				break;
			
			case gameplayActions.CHECK_ALL_ARROUND_MINES_FLAGGED:
				this.game.checkAllArroundMinesFlagged(action.row, action.column);
				break;
			
			case gameplayActions.MARK_AREA:
				var callback = cell => cell.marked = true;

				this.game.battlefield.forAllArround(action.row, action.column, callback);
				// there is NO break!!!
			case gameplayActions.MARK_CELL:
				var cell = this.game.battlefield.get(action.row, action.column);

				cell.marked = true;
				break;
			
			case gameplayActions.UNMARK_AREA:
				var callback = cell => cell.marked = false;

				this.game.battlefield.forAllArround(action.row, action.column, callback);
				// there is NO break!!!
			case gameplayActions.UNMARK_CELL:
				var cell = this.game.battlefield.get(action.row, action.column);

				cell.marked = false;
				break;
			
			default: return;
		}

		super.update();
	}

	getCell(rows, columns) {
		return this.game.battlefield.get(rows, columns);
	}

	getGameTime() {
		return this.game.getGameTime();
	}

	_initialize(rows, columns, mines) {
		this.game.initialize(rows, columns, mines);

		Object.assign(this.payload, {
			rows, columns, mines,
			cells: this._getExtendedCells()
		});
	}

	_getExtendedCells() {
		let cells = [];

		for (let i = 0, lim = this.game.rows; i < lim; i++) {
			let row = [];

			for (let j = 0, lim = this.game.columns; j < lim; j++) {
				let originCell = this.game.battlefield.get(i, j);
				let augmentedCell = Object.assign(originCell, {
					marked: false
				});

				row.push(augmentedCell);
			}

			cells.push(row);
		}

		return cells;
	}
}


// re-export
export { GameStatus, GameOverStatus } from "../libs/minesweeper.es6"

export const Difficult = Enum `EASY, NORMAL, HARD`

export const gameplayStore = new GameplayStoreClass;