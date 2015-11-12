import ControllerView from "../libs/controller-view.es6";
import minesStore from "../stores/mines_store.es6";


export class Mines extends ControllerView {
	constructor() {
		super(minesStore);
	}

	render() {
		return <span> Mines: { this.state.mines } </span>
	}
}