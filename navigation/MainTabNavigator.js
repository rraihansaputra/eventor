import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';

import HostCalendarScreen from '../screens/HostCalendarScreen';
import ChatScreen from '../screens/ChatScreen';
import CalendarScreen from '../screens/CalendarScreen';
import CreateEventScreen from '../screens/CreateEventScreen'

export default TabNavigator(
	{
		HostCalendar: {
		  screen: HostCalendarScreen,
		},
		CreateEvent: {
		screen: CreateEventScreen,
		},
    Home: {
      screen: HomeScreen,
    },
    Calendar: {
      screen: CalendarScreen,
    },
    Chat: {
      screen: ChatScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Home':
            iconName = Platform.OS === 'ios'
              ? `ios-information-circle${focused ? '' : '-outline'}`
              : 'md-information-circle';
            break;
          case 'Calendar':
            iconName = Platform.OS === 'ios'
              ? `ios-link${focused ? '' : '-outline'}`
              : 'md-link';
            break;
          case 'Chat':
            iconName = Platform.OS === 'ios'
              ? `ios-options${focused ? '' : '-outline'}`
              : 'md-options';
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: false,
    initialRouteName: 'Home',
  }
);
