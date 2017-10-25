import { action, computed, observable } from 'mobx';


export default class Event {
  @observable key = undefined;
  @observable name = '';
  @observable hostName = '';
  @observable dateTime = null;
  @observable location = '';
  @observable description = '';
  @observable tags = [];
  @observable created_at = undefined;
  @observable created_by = '';

  constructor(name, hostName, dateTime, location, description, created_by, tags='') {
    this.key = Date().toString() + name;
    this.name = name;
    this.hostName = hostName;
    this.dateTime = dateTime;
    this.location = location;
    this.description = description;
    this.tags = tags.split(" ");
    this.created_at = Date.now();
    this.created_by = created_by;
  }

}