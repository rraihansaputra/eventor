import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class EventRowView extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    const {event} = this.props;
    return (
      <View key={event.key} style={styles.eventViewList}>
        <View>
          <Text style={{fontSize:20}}> {event.name} </Text>
          <Text> by {event.hostName} </Text> 
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
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});