import { GameOverStatus } from "../stores/gameplay_store.es6";
import ClassList from "../libs/css-class-list.es6";


export class GameoverLayout extends React.Component {
	render() {
		let text = null;

		switch (this.props.score) {
			case GameOverStatus.SUCCESS:
				text = "WIN";
				break;
			case GameOverStatus.FAIL:
				text = "LOSE";
				break;
		}

		return <div className={ ClassList.GAMEOVER_LAYOUT } style={ this.props.size }>
			<span className={ ClassList.GAMEOVER_TEXT }>
				{ text }
			</span>
		</div>
	}
}

GameoverLayout.propTypes = {
	size: React.PropTypes.shape({
		width: React.PropTypes.number.isRequired,
		height: React.PropTypes.number.isRequired
	})
};