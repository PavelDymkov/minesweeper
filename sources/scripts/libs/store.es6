import dispatcher from "./dispatcher.es6";


export default class Store {
	constructor() {
		this.payload = null;
		this._listeners = [];

		this.id = dispatcher.register(this.update.bind(this));
	}

	addListener(handler) {
		this._listeners.push(handler);
	}

	removeListener(handler) {
		let index = this._listeners.indexOf(handler);

		if (index != -1) {
			this._listeners.splice(index, 1);
		}
	}

	waitFor(...stores) {
		let ids = stores.map(store => store.id);
		
		dispatcher.waitFor(ids);
	}

	update() {
		this.updatePayload();

		let payload = this.getPayload();

		this._listeners.forEach(handler => handler(payload));
	}

	updatePayload() { }

	getPayload() {
		return this.payload;
	}
}