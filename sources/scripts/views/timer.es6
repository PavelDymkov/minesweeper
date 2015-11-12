import ControllerView from "../libs/controller-view.es6";
import timeStore from "../stores/time_store.es6";


export class Timer extends ControllerView {
	constructor() {
		super(timeStore);

		this.timer = null;
		this.timeoutCallback = this.timeoutCallback.bind(this);
	}

	onChange(payload) {
		let state = this.computeState(payload);

		this.setTimer(state);	
		this.setState(state);
	}

	componentWillUnmount() {
		super.componentWillUnmount();
		
		this.deactivateTimer();
	}

	componentDidMount() {
		super.componentDidMount();

		this.setTimer(this.state);
	}

	setTimer(state) {
		if (state.isRunning) {
			if (!this.timer)
				this.timer = setTimeout(this.timeoutCallback, 1000 - state.delay);
		} else {
			this.deactivateTimer();
		}
	}

	timeoutCallback() {
		this.setState({
			time: this.state.time + 1
		});

		this.timer = setTimeout(this.timeoutCallback, 1000);
	}

	deactivateTimer() {
		clearTimeout(this.timer);
		this.timer = null;
	}

	render() {
		return <span> Time: { this.state.time } </span>
	}
}