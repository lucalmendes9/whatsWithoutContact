import React, { Component } from 'react';
import { View, Text, Button, TextInput, Linking } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { withNavigationFocus } from 'react-navigation';

class Home extends Component{

    constructor(props) {
        super(props);
        this.state = {
            numbersList: null,
            value: ''
        }
    }

    async componentDidMount() {
        try {
            const valueStorage = await AsyncStorage.getItem('@MySuperStore:key');
            if (valueStorage !== null) {
                console.log( valueStorage );
                await this.setState({
                    numbersList: [JSON.parse(valueStorage)]
                })
                console.log(this.state.numbersList);
            }else{
                console.log('async is null')
            }
        } catch (error) {
            console.log("Error saving data" + error);
        }
    }

    async addItemArray() {
        if(this.state.numbersList === null){
            await this.setState({
                numbersList: [this.state.value]
            })
        }else{
            await this.setState({
                numbersList: [...this.state.numbersList, this.state.value]
            })
        }
        await AsyncStorage.setItem('@MySuperStore:key', JSON.stringify(this.state.numbersList));
        console.log(this.state.numbersList);
    }

    async newNumber(value){
        await this.setState({ value: value });
        console.log(this.state.value);
    }

    // async clearItem(){
    //     await AsyncStorage.removeItem('@MySuperStore:key');
    //     const valueStorage = await AsyncStorage.getItem('@MySuperStore:key');
    //     console.log( JSON.parse(valueStorage) );
    // }
    

    render(){

        return(
            <View>

                <TextInput
                placeholder="Numero que deseja falar..."
                onChangeText={(value) => this.newNumber(value)}
                />

                <Button
                onPress={this.addItemArray.bind(this)}
                title="Add novo numero"
                color="#2196f3"
                accessibilityLabel="Add novo numero"
                />

                {/* <Button
                onPress={this.clearItem.bind(this)}
                title="clear"
                color="#2196f3"
                accessibilityLabel="clear"
                /> */}
  
                <Text>
                Stored key is = {this.state.numbersList}
                </Text>
            </View>
        )
    }
    
}

export default withNavigationFocus(Home);