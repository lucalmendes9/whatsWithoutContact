import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import { Text, Image } from 'react-native';

import Home from './pages/Home';
import Recents from './pages/Recents';

export default createAppContainer(
    createBottomTabNavigator({
        Home: Home ,
        Recentes: Recents
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if(routeName == 'Home'){
                    iconName = 'ios-home';
                }else if(routeName == 'Recentes'){
                    iconName = 'ios-time';
                }

                return <Ionicons name={iconName} size={25} color={tintColor} /> 
            },
            headerStyle: {
                backgroundColor: '#25d366',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray'
        }
    })
)
