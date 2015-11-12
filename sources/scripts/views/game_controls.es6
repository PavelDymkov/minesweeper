import { HorizontalLayout } from "./horizontal_layout.es6";
import { Button } from "./button.es6";
import { toMainSrceen, restartGame } from "../actions/app_actions.es6";


export class GameControls extends React.Component {
	render() {
		let restartButton = null;

		if (this.props.restartable) {
			restartButton =
				<Button onRelease={ restartGame } text="Restart" />
		}

		return <HorizontalLayout>
			<Button onRelease={ toMainSrceen } text="Menu" />
			{ restartButton }
		</HorizontalLayout>
	}
}

GameControls.propTypes = {
	restartable: React.PropTypes.bool
};