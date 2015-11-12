export default class ControllerView extends React.Component {
	constructor(store) {
		super();

		this.store = store;

		let payload = store.getPayload();

		this.state = this.computeState(payload);

		this.onChange = this.onChange.bind(this);
	}

	computeState(payload) {
		return payload;
	}

	componentDidMount() {
		this.store.addListener(this.onChange);
	}

	componentWillUnmount() {
		this.store.removeListener(this.onChange);
	}

	onChange(payload) {
		let state = this.computeState(payload);
		
		this.setState(state);
	}

	render () {
		throw new Error("no implamentation");
	}
}