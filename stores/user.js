import { action, computed, observable } from 'mobx';
import Event from './event'

class User {
	@observable id = 'admin';
	@observable eventsSeen = [];
	@observable eventsInterested = [];
	@observable tags = ["books", "cars", "knitting"];
	@observable loaded = false;

	@action addEventSeen(eventKey) {
		this.eventsSeen.push(eventKey);
	}

	@action addEventInterested(eventKey) {
		this.eventsSeen.push(eventKey);
		this.eventsInterested.push(eventKey);
	}

	@action resetEventsSeen() {
		this.eventsSeen.clear();
		this.eventsInterested.clear();
	}

	@computed get idString() {
		return this.id.toString();
	}

	@computed get eventsSeenList() {
		return this.eventsSeen;
	}


}

export default new User();