import ControllerView from "../libs/controller-view.es6";
import { Cell } from "./cell.es6";
import { gameplayStore, GameStatus, GameOverStatus } from "../stores/gameplay_store.es6";
import * as Actions from "../actions/gameplay_actions.es6";
import Enum from "../libs/enum.es6";
import ClassList from "../libs/css-class-list.es6";


const MouseButton = {
	LEFT: 0x00,
	MIDDLE: 0x01,
	RIGHT: 0x02
};

const MouseButtonMap = new Map;

MouseButtonMap.set(MouseButton.LEFT, "LEFT");
MouseButtonMap.set(MouseButton.MIDDLE, "MIDDLE");
MouseButtonMap.set(MouseButton.RIGHT, "RIGHT");

const MouseButtonsComplex = {
	UNPRESSED: 0b000,
	LEFT: 0b001,
	MIDDLE: 0b010,
	RIGHT: 0b100
};

const MouseEventType = {
	MOUSE_DOWN: "mousedown",
	MOUSE_UP: "mouseup"
};

const MouseState =
	Enum `
		NO_ACTIONS
		CHECK_CELL
		SET_FLAG
		CHECK_ALL_ARROUND
	`

const MarkedState =
	Enum `
		NO_MARKS
		MARKED_CELL
		MARKED_AREA
	`

let generateCellId = (row, column) => `cell_${ row }_${ column }`;


export class Battlefield extends ControllerView {
	constructor() {
		super(gameplayStore);

		this.eventHandlers = {
			onMouseDownCapture: this.mouseButtonsController.bind(this),
			onMouseDown: this.onMouseDown.bind(this),
			onMouseUpCapture: this.onMouseUp.bind(this),
			onMouseUp: this.mouseButtonsController.bind(this),
			onMouseLeave: this.onMouseLeave.bind(this)
		};

		this.mouseButtons = MouseButtonsComplex.UNPRESSED;
		this.mouseState = MouseState.NO_ACTIONS;
		this.markedState = MarkedState.NO_MARKS;

		this.currentCell = null;
		this.feedbacks = {
			setCurrentCell: this.setCurrentCell.bind(this)
		};
	}

	mouseButtonsController(event) {
		let mouseButtonAlies = MouseButtonMap.get(event.button);

		switch (event.type) {
			case MouseEventType.MOUSE_DOWN:
				this.mouseButtons |= MouseButtonsComplex[mouseButtonAlies];
				break;

			case MouseEventType.MOUSE_UP:
				if (this.mouseState == MouseState.NO_ACTIONS) break;

				this.mouseButtons ^= MouseButtonsComplex[mouseButtonAlies];
				break;
		}

		let leftAndRightButtonsPressed =
			this.mouseButtons & MouseButtonsComplex.LEFT && this.mouseButtons & MouseButtonsComplex.RIGHT;

		if (this.mouseButtons & MouseButtonsComplex.MIDDLE || leftAndRightButtonsPressed) {
			this.mouseState = MouseState.CHECK_ALL_ARROUND;
		} else
		if (this.mouseButtons & MouseButtonsComplex.LEFT) {
			this.mouseState = MouseState.CHECK_CELL;
		} else
		if (this.mouseButtons & MouseButtonsComplex.RIGHT) {
			this.mouseState = MouseState.SET_FLAG;
		} else {
			this.mouseState = MouseState.NO_ACTIONS;
		}
	}

	onMouseDown() {
		this.markCells();
	}

	onMouseUp() {
		this.unmarkCells();

		switch (this.mouseState) {
			case MouseState.CHECK_CELL:
				Actions.checkCell(this.currentCell.row, this.currentCell.column);
				break;

			case MouseState.SET_FLAG:
				Actions.setFlag(this.currentCell.row, this.currentCell.column);
				break;
			
			case MouseState.CHECK_ALL_ARROUND:
				Actions.checkAllArroundMinesFlagged(this.currentCell.row, this.currentCell.column);
				break;
			
			default: return;
		}

		this.resetMouseState();
	}

	onMouseLeave() {
		this.unmarkCells();

		this.currentCell = null;
		this.resetMouseState();
	}

	setCurrentCell(row, column) {
		this.unmarkCells();

		this.currentCell = { row, column };

		this.markCells();
	}

	markCells() {
		if (this.currentCell) switch (this.mouseState) {
			case MouseState.CHECK_CELL:
				Actions.markCell(this.currentCell.row, this.currentCell.column);

				this.markedState = MarkedState.MARKED_CELL;
				break;
			
			case MouseState.CHECK_ALL_ARROUND:
				Actions.markArea(this.currentCell.row, this.currentCell.column);

				this.markedState = MarkedState.MARKED_AREA;
				break;
		}
	}

	unmarkCells() {
		switch (this.markedState) {
			case MarkedState.MARKED_CELL:
				Actions.unmarkCell(this.currentCell.row, this.currentCell.column);
				break;
			
			case MarkedState.MARKED_AREA:
				Actions.unmarkArea(this.currentCell.row, this.currentCell.column);
				break;
		}

		this.markedState = MarkedState.NO_MARKS;
	}

	resetMouseState() {
		this.mouseButtons = MouseButtonsComplex.UNPRESSED;
		this.mouseState = MouseState.NO_ACTIONS;
	}

	render() {
		let rows = this.state.rows;
		let columns = this.state.columns;

		let cells = [];

		for (let row = 0; row < rows; row++) {
			for (let column = 0; column < columns; column++) {
				let settings = this.state.cells[row][column];
				let cell =
					<Cell key={ generateCellId(row, column) } { ...settings } { ...this.feedbacks } />

				cells.push(cell);
			}
		}
		
		return <div className={ ClassList.BATTLEFIELD } style={ this.props.size } { ...this.eventHandlers }>
			{ cells }
		</div>
	}
}

Battlefield.propTypes = {
	size: React.PropTypes.shape({
		width: React.PropTypes.number.isRequired,
		height: React.PropTypes.number.isRequired
	})
};