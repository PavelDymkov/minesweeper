import Store from "../libs/store.es6";
import { gameplayStore, GameStatus } from "./gameplay_store.es6";
import { appActions } from "../actions/app_actions.es6";
import { gameplayActions } from "../actions/gameplay_actions.es6";
import Enum from "../libs/enum.es6";


class AppStoreClass extends Store {
	constructor() {
		super();

		this.payload = {
			layout: "ontouchstart" in document ?
				Layouts.TOUCH_DEVICE : Layouts.MENU,
			difficult: null,
			gameInProcess: false
		};
	}

	update(action) {
		this.waitFor(gameplayStore);

		switch (action.type) {
			case appActions.START_GAME:
				this.payload.layout = Layouts.GAME;
				this.payload.difficult = action.difficult;
				this.payload.gameInProcess = true;
				break;

			case appActions.CONTINUE_GAME:
				this.payload.layout = Layouts.GAME;
				this.payload.gameInProcess = true;
				break;
			
			case appActions.TO_MAIN_MENU:
				this.payload.layout = Layouts.MENU;
				break;
			
			case gameplayActions.CHECK_CELL:
			case gameplayActions.CHECK_ALL_ARROUND_MINES_FLAGGED:
				let status = gameplayStore.getPayload().status;

				if (status == GameStatus.COMPLETE) {
					this.payload.gameInProcess = false;
				}
				break;
			
			default: return;
		}

		super.update();
	}
}


export const Layouts = Enum `MENU, GAME, TOUCH_DEVICE`

export const appStore = new AppStoreClass;