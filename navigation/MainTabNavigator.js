import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';

import HostCalendarScreen from '../screens/HostCalendarScreen';
import FilterScreen from '../screens/FilterScreen';
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
    Filter: {
      screen: FilterScreen,
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
              ? `ios-home${focused ? '' : '-outline'}`
              : 'md-home';
            break;
          case 'Calendar':
            iconName = Platform.OS === 'ios'
              ? `ios-calendar${focused ? '' : '-outline'}`
              : 'md-calendar';
            break;
          case 'Filter':
            iconName = Platform.OS === 'ios'
              ? `ios-gear${focused ? '' : '-outline'}`
              : 'md-gear';
          case 'HostCalendar':
            iconName = Platform.OS === 'ios'
              ? `ios-calendar${focused ? '' : '-outline'}`
              : 'md-calendar';
            break;
          case 'CreateEvent':
            iconName = Platform.OS === 'ios'
              ? `ios-contract${focused ? '' : '-outline'}`
              : 'md-contract';
            break;
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
