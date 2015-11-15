import ControllerView from "../libs/controller-view.es6";
import { gameplayStore, GameStatus } from "../stores/gameplay_store.es6";
import { Battlefield } from "./battlefield.es6";
import { GameControls } from "./game_controls.es6";
import { GameInfo } from "./game_info.es6";
import { GameoverLayout } from "./gameover_layout.es6";
import { size } from "./cell.es6";
import ClassList from "../libs/css-class-list.es6";


export class GameLayout extends ControllerView {
	constructor() {
		super(gameplayStore);
	}

	computeState(payload) {
		return {
			size: {
				width: size * payload.columns,
				height: size * payload.rows
			},
			isOver: payload.status == GameStatus.COMPLETE,
			score: payload.score
		};
	}

	render() {
		let gameoverLayout =
			this.state.isOver?
			<GameoverLayout score={ this.state.score } size={ this.state.size } />
			: null;

		return <div className={ ClassList.GAME_LAYOUT }>
			<GameControls restartable={ this.state.isOver } />

			<div className={ ClassList.GAME }>
				<Battlefield size={ this.state.size } />
				{ gameoverLayout }
				<GameInfo />
			</div>
		</div>
	}
}