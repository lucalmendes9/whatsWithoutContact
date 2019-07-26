import React, { Component } from 'react';
import { View, Text, Button, Linking } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class Recents extends Component{

    constructor(props) {
        super(props);
        this.state = {
            numbersList: null
        }
    }

    async getKey() {
        try {
          const value = await AsyncStorage.getItem('@MySuperStore:key');
        //   this.setState({numbersList: value});
          this.setState.numbersList.push(value);
        } catch (error) {
          console.log("Error retrieving data" + error);
        }
    }

    async resetKey() {
        try {
          await AsyncStorage.removeItem('@MySuperStore:key');
          const value = await AsyncStorage.getItem('@MySuperStore:key');
          this.setState({numbersList: value});
        } catch (error) {
          console.log("Error resetting data" + error);
        }
    }

    render(){

        this.getKey();

        return(
            
            <View>
                <Text>{`I'm Recentes Component`}</Text>
                <Text onPress={ () => { 
                    Linking.openURL('http://api.whatsapp.com/send?phone=55' + this.state.numbersList); }}>
                Stored key is = {this.state.numbersList}
                </Text>
                <Button
                onPress={this.resetKey.bind(this)}
                title="Reset"
                color="#f44336"
                accessibilityLabel="Reset"
                />
            </View>
        )
    }
    
}