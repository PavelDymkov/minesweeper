import ClassList from "../libs/css-class-list.es6";


export class VerticalLayout extends React.Component {
	render() {
		return <div className={ ClassList.VERTICAL_LAYOUT }>
			{ this.props.children }
		</div>
	}
}

VerticalLayout.propTypes = {
	children: React.PropTypes.arrayOf(React.PropTypes.element)
};