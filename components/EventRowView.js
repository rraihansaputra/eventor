import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class EventRowView extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    const {event} = this.props;
    return (
      <View key={event.key} style={styles.container}>
        <View>
          <Text style={{fontSize:20}}> {event.name} </Text>
          <Text> hosted by {event.hostName} </Text>
        </View>
        <View>
          <Text> {event.dateTime.toDateString()}, {event.dateTime.toTimeString()} </Text>
          <Text> {event.location} </Text>
        </View>
        <Text> {event.description} </Text>
        <Text> tags: {event.tags.join(" ")} </Text>
      </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 5,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
});