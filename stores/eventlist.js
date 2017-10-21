import { action, computed, observable } from 'mobx';

class List {
	@observable events = [];
}

export default new List();