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

export default class CreateEventScreen extends React.Component {
  static navigationOptions = {
    title: 'Create Event',
  };

  constructor(props){
    super(props);
    this.state = {
      eventNameInput: '',
      eventDateTimeInput:'',
      eventLocationInput:'',
      eventDescriptionInput:'',
      eventTagInput:'',
      date: 'Date and Time',
      isDateTimePickerVisible: false,
    };
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDateTimePicked = (date) => {
    this.setState({date: date});
    this.setState({eventDateTimeInput: date})
    this._hideDateTimePicker()
  };

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.flowRight}>
          <TextInput
            style={styles.eventInput}
            onChangeText={(text) => this.setState({eventNameInput: text})}
            placeholder='Name'/>
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
            style={styles.eventInput}
            onChangeText={(text) => this.setState({eventLocationInput: text})}
            placeholder='Location'/>
        </View>
        <View style={styles.flowRight}>
          <TextInput
            style={styles.eventInput}
            onChangeText={(text) => this.setState({eventDescriptionInput: text})}
            placeholder='Description'
            multiline= {true}/>
        </View>
        <View style={styles.flowRight}>
          <TextInput
            style={styles.eventInput}
            onChangeText={(text) => this.setState({eventTagInput: text})}
            placeholder='Tags'/>
        </View>
        
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
});
