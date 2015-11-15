import { VerticalLayout } from "./vertical_layout.es6";
import { Button } from "./button.es6";
import { Difficult } from "../stores/gameplay_store.es6";
import { startGame, continueGame } from "../actions/app_actions.es6";
import ClassList from "../libs/css-class-list.es6";


export class MenuLayout extends React.Component {
	getButton(text, handler) {
		return <Button key={ text } onRelease={ handler } text={ text } />
	}

	render() {
		let buttons = [];

		if (this.props.resumable) {
			buttons.push(this.getButton("Resume", continueGame));
		}

		let start = difficult => () => startGame(difficult);

		buttons.push(this.getButton("Easy", start(Difficult.EASY)));
		buttons.push(this.getButton("Normal", start(Difficult.NORMAL)));
		buttons.push(this.getButton("Hard", start(Difficult.HARD)));

		return <div className={ ClassList.MENU_LAYOUT }>
			<VerticalLayout>
				{ buttons }
			</VerticalLayout>
		</div>
	}
}

MenuLayout.propTypes = {
	resumable: React.PropTypes.bool
};