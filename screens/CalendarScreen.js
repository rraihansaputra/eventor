import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import Store from '../stores/eventmaster';
import { observer } from 'mobx-react/native';
import User from '../stores/user'

@observer
export default class CalendarScreen extends React.Component {
  static navigationOptions = {
    title: 'Calendar',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        {Store.interestedEvents(User).map((event) => (
                  <View key={event.key} style={styles.eventViewList}>
                    <Text> {event.key} </Text>
                    <Text> {event.name} </Text>
                    <Text> {event.hostName} </Text>
                    <Text> {event.dateTime.toString()} </Text>
                    <Text> {event.location} </Text>
                    <Text> {event.description} </Text>
                    <Text> {event.tags.join()} </Text>
                  </View>
                ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  eventViewList: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
  },
});
