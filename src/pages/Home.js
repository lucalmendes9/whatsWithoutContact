import React, { Component } from 'react';
import { View, Text, Button, TextInput, Linking } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { withNavigationFocus } from 'react-navigation';
import { TextInputMask } from 'react-native-masked-text';

class Home extends Component{

    constructor(props) {
        super(props);
        this.state = {
            numbersList: null,
            value: '',
            valueunmasked: '',
            errorText: ''
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

    componentDidUpdate(prevProps) {
        if (this.props.isFocused && !prevProps.isFocused) {
            this.setState({ errorText: '' });
        }
    }

    async addItemArray() {
        const cellIsValid = await this.phoneField.isValid();
        const valueNumber = await this.state.value;
        const valueNumberMask = await this.state.valueunmasked;
        const obj = {numeroNoMask:valueNumberMask, numeroMask:valueNumber};
        console.log(obj);
        if(cellIsValid){
            if(this.state.numbersList === null){
                await this.setState({
                    numbersList: [obj]
                })
            }else{
                await this.setState({
                    numbersList: [...this.state.numbersList, obj]
                })
            }
            await AsyncStorage.setItem('@MySuperStore:key', JSON.stringify(this.state.numbersList));
            console.log(this.state.numbersList);
        }
        else{
            console.log('cell not valid');
            this.setState({ errorText: 'Número de telefone inválido. Tente novamente!' });
        }
    }

    

    async newNumber(value){
        const unmasked = await this.phoneField.getRawValue();
        await this.setState({ value: value });
        await this.setState({ valueunmasked: unmasked });

        console.log(unmasked);
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

                <TextInputMask
                    type={'cel-phone'}
                    options={{ 
                        validator: function(value, settings) {
                            console.log('acertooooo')
                        },
                    }}
                    value={this.state.value}
                    placeholder="Numero que deseja falar..."
                    onChangeText={(value) => this.newNumber(value)}
                    ref={(ref) => this.phoneField = ref}
                />

                <Text>{this.state.errorText}</Text>

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
                    Stored key is = 
                </Text>
            </View>
        )
    }
    
}

export default withNavigationFocus(Home);