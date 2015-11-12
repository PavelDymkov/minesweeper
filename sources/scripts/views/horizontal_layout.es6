import ClassList from "../libs/css-class-list.es6";


export class HorizontalLayout extends React.Component {
	render() {
		return <div className={ ClassList.HORIZONTAL_LAYOUT }>
			{ this.props.children }
		</div>
	}
}

HorizontalLayout.propTypes = {
	children: React.PropTypes.any
};