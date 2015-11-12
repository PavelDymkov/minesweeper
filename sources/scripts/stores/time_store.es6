import Store from "../libs/store.es6";
import { appActions } from "../actions/app_actions.es6";
import { gameplayActions } from "../actions/gameplay_actions.es6";
import { gameplayStore, GameStatus } from "./gameplay_store.es6";



class TimeStoreClass extends Store {
	constructor() {
		super();

		this.payload = {
			time: 0,
			delay: 0,
			isRunning: false
		};
	}

	updatePayload() {
		let time = gameplayStore.getGameTime();

		this.payload.time = time.seconds;
		this.payload.delay = time.milliseconds;
		this.payload.isRunning = gameplayStore.getPayload().status == GameStatus.PENDING;

		return super.updatePayload();
	}

	update(action) {
		this.waitFor(gameplayStore);

		switch (action.type) {
			case appActions.START_GAME:			
			case appActions.RESTART_GAME:
			case appActions.TO_MAIN_MENU:
			case appActions.CONTINUE_GAME:
				break;
			
			case gameplayActions.CHECK_ALL_ARROUND_MINES_FLAGGED:
			case gameplayActions.CHECK_CELL:
				if (this.payload.isRunning && gameplayStore.getPayload().status != GameStatus.COMPLETE)
					return;
				break;
			
			default: return;
		}

		super.update();
	}
}


export default new TimeStoreClass;