import ClassList from "../libs/css-class-list.es6";


let DigitClasses = [ "",
	"ONE_MINE_ARROUND", "TWO_MINES_ARROUND", "THREE_MINES_ARROUND", "FOUR_MINES_ARROUND",
	"FIVE_MINES_ARROUND", "SIX_MINES_ARROUND", "SEVEN_MINES_ARROUND", "EIGHT_MINES_ARROUND"
];

let getDigitClass = digit => ClassList[DigitClasses[digit]];

export const size = 20;

export class Cell extends React.Component {
	constructor() {
		super();

		this.state = { hovered: false };

		this.eventHandlers = {
			onMouseEnter: this.onMouseEnter.bind(this),
			onMouseLeave: this.onMouseLeave.bind(this)
		};
	}

	onMouseEnter() {
		this.props.setCurrentCell(this.props.row, this.props.column);

		this.setState({ hovered: true });
	}

	onMouseLeave() {
		this.setState({ hovered: false });
	}

	render() {
		let classes = [ClassList.CELL];
		let content = null;

		if (this.props.checked) {
			if (this.props.hasMine) {
				if (this.props.blowUp) {
					classes.push(ClassList.UNDERMINED);
				}

				content = <span> m </span>
			} else {
				classes.push(ClassList.CHECKED);
				
				if (this.props.minesArround) {
					content =
						<span className={ getDigitClass(this.props.minesArround) }>
							{ this.props.minesArround }
						</span>
				} else {
					content = <div className={ ClassList.EMPTY_CELL }> &nbsp; </div>
				}
			}
		} else
		if (this.props.hasFlag) {
			content = <span> f </span>
		} else {
			if (this.props.marked) {
				classes.push(ClassList.MARKED);
			} else
			if (this.state.hovered) {
				classes.push(ClassList.HOVERED);
			}
		}

		return <div className={ classes.join(" ") } { ...this.eventHandlers }>
			{ content }
		</div>
	}
}

Cell.propTypes = {
	row: React.PropTypes.number.isRequired,
	column: React.PropTypes.number.isRequired,
	checked: React.PropTypes.bool,
	hasMine: React.PropTypes.bool,
	hasFlag: React.PropTypes.bool,
	minesArround: React.PropTypes.number,
	setCurrentCell: React.PropTypes.func.isRequired,
	blowUp: React.PropTypes.bool
};