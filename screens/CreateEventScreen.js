import React from 'react';
import { 
  StyleSheet, 
  Text,
  View,
  TextInput,
  DatePickerAndroid,
  Button,
} from 'react-native';

export default class CreateEventScreen extends React.Component {
  static navigationOptions = {
    title: 'Create Event',
  };

  constructor(props){
    super(props);
    this.state = {
      eventName: '',
      date: '',
    };
  };

  _showDatePicker = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date(),
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        this.setState({date: new Date(year, month, day)})
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  };

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.flowRight}>
            <TextInput
              style={styles.eventInput}
              value={this.state.eventNameInput}
              placeholder='Name'/>
        </View>
        <View style={styles.flowRight}>
            <TextInput
              style={styles.eventInput}
              value={this.state.date.toLocaleString()}
              placeholder='Date'
              onPress={this._showDatePicker}/>
        </View>
        <View style={styles.flowRight}>
          <Button
          onPress={this._showDatePicker}
          title="Date"/>
        </View>
        <View style={styles.flowRight}>
            <TextInput
              style={styles.eventInput}
              value={this.state.eventNameInput}
              placeholder='Location'/>
        </View>
        <View style={styles.flowRight}>
            <TextInput
              style={styles.eventInput}
              value={this.state.eventNameInput}
              placeholder='Description'/>
        </View>
        <View style={styles.flowRight}>
            <TextInput
              style={styles.eventInput}
              value={this.state.eventNameInput}
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
    height: 36,
    padding: 4,
    marginBottom: 5,
    flexGrow: 1,
    fontSize: 18,
  },
});
