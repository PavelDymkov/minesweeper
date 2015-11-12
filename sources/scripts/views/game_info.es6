import { HorizontalLayout } from "./horizontal_layout.es6";
import { Timer } from "./timer.es6";
import { Mines } from "./mines.es6";
import ClassList from "../libs/css-class-list.es6";


export class GameInfo extends React.Component {
	render() {
		return <div className={ ClassList.GAME_INFO }>
			<HorizontalLayout>
				<Timer />
				<Mines />
			</HorizontalLayout>
		</div>
	}
}