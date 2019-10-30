import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Login from '../../screens/login';
import Signup from '../../screens/signup';
import Dashboard from '../../screens/dashboard';
import Notifications from '../../screens/notifications';
import PostBlood from '../../screens/postBlood';
import Settings from '../../screens/settings';
import MyRequests from '../../screens/myRequests';
import Menu from '../../screens/menuBar';
import Check from '../../screens/check'
import PostDetail from '../../screens/postDetail'
import postBlood from "../../screens/postBlood";
import PublicDetails from "../../screens/publicDetailedScreen";

const StackNavigator = createStackNavigator({
  login: {
    screen: Login
  },
  signup: {
    screen: Signup
  },
}
)
const StackNavigatorLogincreen = createStackNavigator({
    dashboard: {
      screen: Dashboard
    },
    myrequests: {
      screen: MyRequests
    },
    postbloodrequirements: {
      screen: PostBlood
    },
    notifications: {
      screen: Notifications
    },
    postDetailedScreen: {
      screen: PostDetail
     },
    publicDetailedScreen:{
        screen:PublicDetails
    },
    logout: {
      screen: Login
    }

  })

  const Drawer = createDrawerNavigator({
    dashboard: StackNavigatorLogincreen,
    myrequests: StackNavigatorLogincreen,
    postbloodrequirements: StackNavigatorLogincreen,
    notifications: StackNavigatorLogincreen,
    postDetailedScreen:StackNavigatorLogincreen,
    publicDetailedScreen:StackNavigatorLogincreen,
    settings: StackNavigatorLogincreen
  }, {
    contentComponent: ({ navigation }) => {
      return <Menu navigation={navigation} />
    }
  })

const SwitchNavigator = createSwitchNavigator({
    login: StackNavigator,
    dashboard: Drawer
  })
const Navigator = createAppContainer(SwitchNavigator)
// const Navigator = createAppContainer(StackNavigator)



export default Navigator;