import React from 'react';
import { 
  StyleSheet, 
  Text,
  View,
  TextInput,
  DatePickerAndroid,
  Button,
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { observer } from 'mobx-react';
import { action, computed, observable } from 'mobx';
import Event from '../stores/event'
import { store } from '../stores/eventlist'

@observer
export default class CreateEventScreen extends React.Component {
  static navigationOptions = {
    title: 'Create Event',
  };

  constructor(props){
    super(props);
    this.state = {
      eventNameInput: '',
      eventHostNameInput: '',
      eventDateTimeInput:'',
      eventLocationInput:'',
      eventDescriptionInput:'',
      eventTagInput:'',
      date: 'Date and Time',
      isDateTimePickerVisible: false,
    };
    this.justCreatedEvent = null;
  };

  eventList = [];

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDateTimePicked = (date) => {
    this.setState({date: date});
    this.setState({eventDateTimeInput: date})
    this._hideDateTimePicker()
  };

  _saveFormData = () => {
    this.justCreatedEvent = new Event(
      this.state.eventNameInput,
      this.state.eventHostNameInput,
      this.state.eventDateTimeInput,
      this.state.eventLocationInput,
      this.state.eventDescriptionInput,
      this.state.eventTagInput,
      )
    this.eventList.push(this.justCreatedEvent);
    this._resetForm();
    this.setState({Eventstatus: this.eventList.length.toString() });
  };

  _resetForm = () => {
    this.state = {
      eventNameInput: '',
      eventHostNameInput: '',
      eventDateTimeInput:'',
      eventLocationInput:'',
      eventDescriptionInput:'',
      eventTagInput:'',
      date: 'Date and Time',
    };
    let textInputList = [
      'eventNameInput',
      'eventHostNameInput',
      'eventLocationInput',
      'eventDescriptionInput',
      'eventTagInput',
    ];
    for (let ref of textInputList) {
      this._clearText(ref);
    }
  };

  _clearText = (fieldName) => {
    console.log(fieldName);
    this.refs[fieldName].setNativeProps({text: ''});
  };

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.flowRight}>
          <TextInput
            ref={'eventNameInput'}
            style={styles.eventInput}
            onChangeText={(text) => this.setState({eventNameInput: text})}
            placeholder='Name'/>
        </View>
        <View style={styles.flowRight}>
          <TextInput
            ref={'eventHostNameInput'}
            style={styles.eventInput}
            onChangeText={(text) => this.setState({eventHostNameInput: text})}
            placeholder='Host Name'/>
        </View>
        <View style={styles.flowRight}>
          <Button
            onPress={this._showDateTimePicker}
            title={this.state.date.toString()}/>
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDateTimePicked}
            onCancel={this._hideDateTimePicker}
            mode='datetime'
          />
        </View>
        <View style={styles.flowRight}>
          <TextInput
            ref={'eventLocationInput'}
            style={styles.eventInput}
            onChangeText={(text) => this.setState({eventLocationInput: text})}
            placeholder='Location'/>
        </View>
        <View style={styles.flowRight}>
          <TextInput
            ref={'eventDescriptionInput'}
            style={styles.eventInput}
            onChangeText={(text) => this.setState({eventDescriptionInput: text})}
            placeholder='Description'
            multiline= {true}/>
        </View>
        <View style={styles.flowRight}>
          <TextInput
            ref={'eventTagInput'}
            style={styles.eventInput}
            onChangeText={(text) => this.setState({eventTagInput: text})}
            placeholder='Tags'/>
        </View>
        <View style={styles.flowRight}>
          <Button
            onPress={this._saveFormData}
            title={'Add Event'}/>
        </View>
        { this.eventList.length > 0 &&
            <View style={styles.eventViewList}>
              <Text> {this.justCreatedEvent.key} </Text>
              <Text> {this.justCreatedEvent.name} </Text>
              <Text> {this.justCreatedEvent.hostName} </Text>
              <Text> {this.justCreatedEvent.dateTime.toString()} </Text>
              <Text> {this.justCreatedEvent.location} </Text>
              <Text> {this.justCreatedEvent.description} </Text>
              <Text> {this.justCreatedEvent.tags} </Text>
            </View>
        }

        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 25,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    flex: 1,
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
  },
  eventInput: {
    minHeight: 36,
    padding: 4,
    marginBottom: 5,
    flexGrow: 1,
    fontSize: 18,
  },
  eventViewList: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
  },
});
