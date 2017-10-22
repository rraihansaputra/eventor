import { action, computed, observable } from 'mobx';
import Event from './event'

class Store {
	@observable events = [];
	@observable loaded = false;

	constructor() {
	  this._initialEventPopulate();
	}

	@action _initialEventPopulate() {
		this.addEvent("Knitting Tutorials 101", "Knitting Community", new Date(2017, 10, 1, 13), "Southbank", "Learn to knit with instagram extraordinaire, Me!","knit", "knitting tutorial beginners");
		this.addEvent("Cars and Coffee", "RealGarage", new Date(2017, 11, 9, 7), "Toowong", "No frills, just Cars and Coffee on a Sunday morning", "cars", "cars meetup coffee sunday");
		this.addEvent("Book Fair 2018", "Library", new Date(), "CBD", "Biggest book fair in Brisbane is coming!", "book", "book fair discount literature books");
	}

	@action addEvent(name, hostName, dateTime, location, description, created_by, tags) {
		const event = new Event(name, hostName, dateTime, location, description, created_by, tags);
		this.events.push(event);
		return event;
	}

	@computed get listLength() {
		return this.events.length;
	}

	@computed get openEvents() {
		return this.events.filter(event => event.created_by);
	}

	@observable createdEvents(userId) {
		return this.events.filter(event => event.created_by == userId);
	}

	@observable unseenEvents(eventsSeen) {
		return this.events.filter(event => !eventsSeen.includes(event.key));
	}

}

export default new Store();