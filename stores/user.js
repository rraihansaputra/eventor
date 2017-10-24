import { action, computed, observable } from 'mobx';
import Event from './event'

class User {
	@observable id = 'admin';
	@observable eventsSeen = [];
	@observable eventsInterested = [];
	@observable tagSet = new Set(["books", "cars", "knitting"]);
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

	@action addTag(tag) {
		this.tagSet.add(tag);
		console.log(this.tagSet)
	}

	@action removeTag(tag) {
		this.tagSet.delete(tag);
		console.log(this.tagSet)
	}

	@computed get idString() {
		return this.id.toString();
	}

	@computed get eventsSeenList() {
		return this.eventsSeen;
	}

	@computed get tags() {
		console.log('getting tags..')
		console.log([...this.tagSet])
		return [...this.tagSet]
	}


}

export default new User();