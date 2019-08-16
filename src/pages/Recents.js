import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Linking, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { withNavigationFocus } from 'react-navigation';
import Header from '../components/Header';
import Bg from '../assets/bg.png';
import styled from 'styled-components/native';


class Recents extends Component{

  constructor(props) {
      super(props);
      this.state = {
          numbersList: ''
      }
  }

  async componentDidMount() {
    try {
      await this.getStorage();
      // await this.listNumbers();
    } catch (error) {
        console.log("Error saving data" + error);
    }
  }

  async componentDidUpdate(prevProps) {
    if (this.props.isFocused && !prevProps.isFocused) {
      await this.getStorage();
      // await this.listNumbers();
    }
  }

  async getStorage(){
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
  }

  async limpar(){
    await AsyncStorage.removeItem('@MySuperStore:key');
    await this.setState({numbersList: null})
  }

    

    render(){

        return(
            <View>

                <Header title="Números Recentes" />

                <ImageBackground source={Bg} 
                        style={{justifyContent: 'center', width: '100%', 
                            height: '100%'}}>
                  {/* <Text onPress={ () => { 
                      Linking.openURL('http://api.whatsapp.com/send?phone=55'); }}>
                  </Text> */}

                  <List>
                    <FlatList
                      data={this.state.numbersList}
                      extraData={this.state.numbersList}
                      showsVerticalScrollIndicator={false}
                      renderItem={({item}) => 
                        
                        <Text key={item.numeroNoMask.toString()} 
                          style={styles.TxtNumbers}>
                          {/* <View style={styles.ItemNumbers} /> */}
                          <Text onPress={ () => { 
                            Linking.openURL('http://api.whatsapp.com/send?phone=55'+item.numeroNoMask+''); 
                          }} >
                            {item.numeroMask}
                          </Text>
                        </Text>
                      }
                      keyExtractor={({item, index}) => index}
                    />
                  </List>

                  <BtnLimpar onPress={this.limpar.bind(this)}> 
                    <TextLimpar>Limpar</TextLimpar>
                  </BtnLimpar>

                </ImageBackground>

            </View>
        )
    }
    
}

export default withNavigationFocus(Recents);

const List = styled.View`
    align-items: center;
`
const BtnLimpar = styled.TouchableOpacity`
    background-color: #34b7f1;
    padding: 10px 0px;
    align-items: center;
    border-radius: 5px;
    margin: 20px auto;
    width: 70%;
`
const TextLimpar = styled.Text`
    color: #FFF;
    font-size: 18px;
`

const styles = StyleSheet.create({

  TxtNumbers: {
    fontSize: 17, paddingVertical: 5, display: 'flex',
    alignItems: 'center',
    borderBottomWidth: 1, borderBottomColor: '#000'
  },
  ItemNumbers: {
    backgroundColor: '#000',
    width: 10,
    height: 10,
    borderRadius: 50
  }

})