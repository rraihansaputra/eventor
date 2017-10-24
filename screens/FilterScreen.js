import React from 'react';
import { ScrollView, StyleSheet, Text, View, Button } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { observer } from 'mobx-react/native';
import User from '../stores/user'
import Store from '../stores/eventmaster'

@observer
export default class FilterScreen extends React.Component {
  static navigationOptions = {
    title: 'Filter Selection',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
        {Store.allTags.map((tag) =>
          <Fml key={tag} tag={tag} />
          )}
        </View>
      </ScrollView>
    );
  }
}


@observer
class Fml extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userTag: this._getUserTag(),
      color: '#2196F3'
    };
  }

  _getUserTag() {
    check = [...User.tags];
    return check.includes(this.props.tag);
  }

  colorSel() {
    if (this.state.userTag) {return 'limegreen'}
    else { return '#2196F3' }
  }

  _handlePress = () => {
    User.addTag(this.props.tag);
    this.setState({userTag: true})
    this.render();
  }

  render () {
    console.log('render')
    return (
      <Button
        key = {this.props.tag}
        title = {this.props.tag}
        onPress = {this._handlePress}
        color = {this.colorSel()}
      />
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
