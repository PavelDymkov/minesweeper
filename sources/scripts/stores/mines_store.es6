import Store from "../libs/store.es6";
import { appActions } from "../actions/app_actions.es6";
import { gameplayActions } from "../actions/gameplay_actions.es6";
import { gameplayStore, GameStatus } from "./gameplay_store.es6";



class MinesStoreClass extends Store {
	constructor() {
		super();

		this.payload = {
			mines: null
		};
	}

	update(action) {
		this.waitFor(gameplayStore);

		switch (action.type) {
			case appActions.START_GAME:			
			case appActions.RESTART_GAME:
				this.payload.mines = gameplayStore.getPayload().mines;
				break;

			case gameplayActions.SET_FLAG:
				var cell = gameplayStore.getCell(action.row, action.column);

				if (cell.checked) return;

				this.payload.mines = cell.hasFlag ? this.payload.mines - 1 : this.payload.mines + 1;
				break;

			case gameplayActions.CHECK_ALL_ARROUND_MINES_FLAGGED:
			case gameplayActions.CHECK_CELL:
				if (gameplayStore.getPayload().status == GameStatus.COMPLETE)
					this.payload.mines = 0;
				break;
			
			default: return;
		}

		super.update();
	}
}


export default new MinesStoreClass;