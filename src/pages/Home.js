import React, { Component } from 'react';
import { View, ImageBackground, StatusBar, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { withNavigationFocus } from 'react-navigation';
import { TextInputMask } from 'react-native-masked-text';
import Header from '../components/Header';
import styled from 'styled-components/native';
import Bg from '../assets/bg.png';

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
                    numbersList: JSON.parse(valueStorage)
                })
                console.log(this.state.numbersList);
            }else{
                console.log('async is null')
            }
        } catch (error) {
            console.log("Error saving data" + error);
        }
    }

    async componentDidUpdate(prevProps) {
        if (this.props.isFocused && !prevProps.isFocused) {
            this.setState({ errorText: '' });
            try {
                const valueStorage = await AsyncStorage.getItem('@MySuperStore:key');
                if (valueStorage !== null) {
                    console.log( valueStorage );
                    await this.setState({
                        numbersList: JSON.parse(valueStorage)
                    })
                    console.log(this.state.numbersList);
                }else{
                    console.log('async is null')
                }
            } catch (error) {
                console.log("Error saving data" + error);
            }
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
                const stringState = await JSON.stringify(this.state.numbersList);
                console.log('stringState ', stringState);
                const clearString = stringState.replace(']','');
                console.log('clearString ', clearString);
                const finalString = clearString + ',' + await JSON.stringify(obj) + ']';
                console.log('finalString ', finalString);
                await this.setState({
                    numbersList: await JSON.parse(finalString)
                })
            }
            await AsyncStorage.setItem('@MySuperStore:key', JSON.stringify(this.state.numbersList));
            console.log(this.state.numbersList);
            this.setState({ value: '' })
            Linking.openURL('http://api.whatsapp.com/send?phone=55'+valueNumberMask+''); 

        }
        else{
            console.log('cell not valid');
            this.setState({ errorText: 'Número de telefone inválido. Tente novamente!' });
        }
    }

    

    async newNumber(value){
        await this.setState({ value: value });
        const unmasked = await this.phoneField.getRawValue();
        await this.setState({ valueunmasked: unmasked });

        console.log(this.state.valueunmasked);
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
                <StatusBar backgroundColor="#128c7e" barStyle="light-content" />
                <Header title="WhatsWithoutContact" />

                
                    <ImageBackground source={Bg} 
                        style={{justifyContent: 'center', width: '100%', 
                            height: '100%'}}>
                        <TextInputMask
                            style={styles.NumberInput}
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

                        <Error>{this.state.errorText}</Error>

                        <BtnAdd onPress={this.addItemArray.bind(this)}>
                            <TextAdd>Conversar</TextAdd>
                        </BtnAdd>

                        {/* <Button
                        onPress={this.clearItem.bind(this)}
                        title="clear"
                        color="#2196f3"
                        accessibilityLabel="clear"
                        /> */}
                    </ImageBackground>
               

            </View>
        )
    }
    
}

export default withNavigationFocus(Home);


const BtnAdd = styled.TouchableOpacity`
    background-color: #34b7f1;
    padding: 15px 0px;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin: 0 20px;
`
const TextAdd = styled.Text`
    color: #FFF;
    font-size: 18px;
`
const Error = styled.Text`
    color: #666
`

const styles = StyleSheet.create({
    NumberInput: {
        borderColor: '#000',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 4,
        padding: 5,
        marginHorizontal: 25
    }
})