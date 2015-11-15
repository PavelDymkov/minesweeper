import ControllerView from "../libs/controller-view.es6";
import { appStore, Layouts } from "../stores/app_store.es6";
import { MenuLayout } from "./menu_layout.es6";
import { GameLayout } from "./game_layout.es6";
import { TouchDeviceLayout } from "./touch_device_layout.es6";
import ClassList from "../libs/css-class-list.es6";


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

		switch (this.state.layout) {
			case Layouts.MENU:
				content = <MenuLayout resumable={ this.state.gameInProcess } />
				break;

			case Layouts.GAME:
				content = <GameLayout />
				break;

			case Layouts.TOUCH_DEVICE:
				content = <TouchDeviceLayout />
				break;
		}

		return <div className={ ClassList.APPLICATION } { ...this.handlers }>
			{ content }

			<div className={ ClassList.SOURCE_LINK }>
				<a href="https://github.com/PavelDymkov/minesweeper">
					Исходный код игры
				</a>
			</div>
		</div>
	}
}