import { action, computed, observable } from 'mobx';
import Event from './event'

class Store {
	@observable events = [];
	@observable loaded = false;

	@action addEvent(name, hostName, dateTime, location, description, tags) {
		const event = new Event(name, hostName, dateTime, location, description, tags);
		this.events.push(event);
		return event;
	}

	@computed get listLength() {
		return this.events.length;
	}

	@computed get openEvents() {
		return this.events.filter(event => event.created.by);
	}

}

export default new Store();