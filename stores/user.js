import { action, computed, observable } from 'mobx';
import Event from './event'

class User {
	@observable id = 'admin';
	@observable eventsSeen = [];
	@observable eventsInterested = [];
	@observable loaded = false;

	@action addEventSeen(eventKey) {
		this.eventsSeen.push(eventKey)
	}

	@action addEventInterested(eventKey) {
		this.eventsSeen.push(eventKey)
		this.eventsInterested.push(eventKey)
	}

	@computed get idString() {
		return this.id.toString();
	}

}

export default new User();