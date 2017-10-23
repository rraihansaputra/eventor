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

  @observable unseenEvents = Store.unseenEvents(User)

  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.eventor}
          >EVENTOR</Text>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <SwipeCards
            cards={Store.unseenEvents(User)}
            renderCard={(cardData) => <Card {...cardData} />}
            renderNoMoreCards={() => <NoMoreCards />}
            handleYup={this.handleYup}
            handleNope={this.handleNope}
          />
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <View
            style={[styles.codeHighlightContainer, styles.navigationFilename]}>
            <MonoText style={styles.codeHighlightText}>
              i hope this works by wednesday
            </MonoText>
          </View>
        </View>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use
          useful development tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/development-mode'
    );
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
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
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  eventor: {
    padding: 20,
    fontSize: 30,
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 400,
    height: 400,
    backgroundColor: 'pink',
  },
  noMoreCardsText: {
    fontSize: 22,
  },
});
