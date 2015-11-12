import ControllerView from "../libs/controller-view.es6";
import { appStore, Screens } from "../stores/app_store.es6";
import { MainScreen } from "./main_screen.es6";
import { GameScreen } from "./game_screen.es6";


export class Minesweeper extends ControllerView {
	constructor() {
		super(appStore);

		this.handlers = {
			onMouseDown: this.preventDefault,
			onContextMenu: this.preventDefault
		};
	}

	preventDefault(event) {
		event.preventDefault();
	}

	render() {
		let content = null;

		switch (this.state.screen) {
			case Screens.MAIN:
				content = <MainScreen resumable={ this.state.gameInProcess } />
				break;

			case Screens.GAME:
				content = <GameScreen />
				break;
		}

		return <div { ...this.handlers }>
			{ content }
		</div>
	}
}