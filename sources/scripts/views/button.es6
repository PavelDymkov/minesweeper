import ClassList from "../libs/css-class-list.es6";


export class Button extends React.Component {
	render() {
		return <span className={ ClassList.BUTTON } onClick={ this.props.onRelease }>
			{ this.props.text }
		</span>
	}
}

Button.propTypes = {
	onRelease: React.PropTypes.func,
	text: React.PropTypes.string.isRequired
};