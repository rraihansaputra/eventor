import React from 'react';
import { ScrollView, StyleSheet, Text, View, } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import Store from '../stores/eventmaster';
import { observer } from 'mobx-react/native';
import User from '../stores/user'
import EventRowView from '../components/EventRowView';

@observer
export default class HostCalendarScreen extends React.Component {
  static navigationOptions = {
    title: 'Host Calendar',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        {Store.createdEvents(User).map((event) => (
                  <EventRowView key={event.key} event={event}/>
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
});
