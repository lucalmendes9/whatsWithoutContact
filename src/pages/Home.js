import React, { Component  } from 'react';
import { View, Text, Button, TextInput, Linking } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class Home extends Component{

    constructor(props) {
        super(props);
        this.state = {
            numbersList: []
        }
    }

    async getKey() {
        try {
          const value = await AsyncStorage.getItem('@MySuperStore:key');
        //   this.setState({numbersList: value});
        this.setState(state => {
            const numbersList = state.numbersList.push(value);
      
            return {
            numbersList,
              value: '',
            };
          });
          //Linking.openURL('http://api.whatsapp.com/send?phone=55' + value);
        } catch (error) {
          console.log("Error retrieving data" + error);
        }
    }
    
    async saveKey(value) {
        try {
            await AsyncStorage.setItem('@MySuperStore:key', value);
        } catch (error) {
            console.log("Error saving data" + error);
        }
    }


    

    render(){

        const lapsList = this.state.numbersList.map((data) => {
            return (
              <Text>{data}</Text>
            )
          })

        return(
            <View>
                {/* <Button onPress={ () => {this.global.cards.push('array');}} title="botaooo"/> */}
                <Text>- aaaa</Text>

                <TextInput
                placeholder="Enter key you want to save!"
                
                onChangeText={(value) => this.saveKey(value)}
                />

                <Button
                onPress={this.getKey.bind(this)}
                title="Get Keyyy"
                color="#2196f3"
                accessibilityLabel="Get Key"
                />

                <Text>
                Stored key is = {this.state.numbersList}
                </Text>
                {lapsList}
            </View>
        )
    }
    
}

