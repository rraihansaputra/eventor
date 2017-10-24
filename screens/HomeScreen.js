import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import { WebBrowser } from 'expo';
import { observable } from 'mobx';
import { observer } from 'mobx-react/native';
import User from '../stores/user';
import Store from '../stores/eventmaster';

import SwipeCards from 'react-native-swipe-cards';

import { MonoText } from '../components/StyledText';

@observer
export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    header: null,
  };

  handleYup (card) {
    User.addEventInterested(card.key);
  }
  handleNope (card) {
    User.addEventSeen(card.key);
  }

  _renderYup = () => {
    console.log(Store.allTags);
    try{this.handleYup(this.refs.swipeCardDisplay.state.card);}
    catch(e){}
  }

  _renderNope = () => {
    try{this.handleNope(this.refs.swipeCardDisplay.state.card);}
    catch(e){}
  }

  @observable unseenEvents = Store.unseenEvents(User)

  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.eventor}
          >EVENTOR</Text>
        <View
          style={styles.container, {height:500}}>
          <SwipeCards
            ref={'swipeCardDisplay'}
            cards={Store.unseenEvents(User)}
            renderCard={(cardData) => <Card {...cardData} />}
            renderNoMoreCards={() => <NoMoreCards />}
            handleYup={this.handleYup}
            handleNope={this.handleNope}
          />
        </View>
        <View style={styles.container, {paddingTop: 10, flexDirection:'row', justifyContent:'center'}}>
            <View style={{marginHorizontal:20,}}>
              <Button
                onPress={this._renderNope}
                color='red'
                title={"Nah"}/>
            </View>
            <View style={{marginHorizontal:20,}}>
              <Button
                onPress={this._renderYup}
                color='green'
                title={"Interested"}/>
            </View>
          </View>
        {/*
        <View style={styles.tabBarInfoContainer}>
          <View
            style={[styles.codeHighlightContainer, styles.navigationFilename]}>
            <MonoText style={styles.codeHighlightText}>
              i hope this works by wednesday
            </MonoText>
          </View>
        </View>
      */}
      </View>
    );
  }

}

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.card}>
        <Text>{this.props.name}</Text>
        <Text> {this.props.hostName} </Text>
        <Text> {this.props.dateTime.toString()} </Text>
        <Text> {this.props.location} </Text>
        <Text> {this.props.description} </Text>
        <Text> {this.props.tags.join(" ")} </Text>
      </View>
    )
  }
}

@observer
class NoMoreCards extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <View>
          <Button
              onPress={() => User.resetEventsSeen()}
              title={"Reset Cards"}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  eventor: {
    padding: 20,
    fontSize: 30,
    alignContent:'center',
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 360,
    height: 380,
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: 'grey',
    backgroundColor: 'white',
    borderWidth: 1,
    elevation: 1,
  },
});
