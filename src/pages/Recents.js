import React, { Component } from 'react';
import { View, Text, Button, Linking, FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { withNavigationFocus } from 'react-navigation';


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

    

    render(){

        return(
            <View>
                <Text>I'm Recentes Component</Text>
                <Text onPress={ () => { 
                    Linking.openURL('http://api.whatsapp.com/send?phone=55'); }}>
                  Stored key is = 
                </Text>
                <FlatList 
                  data={this.state.numbersList}
                  extraData={this.state.numbersList}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item}) => 
                    <Text key={item.numeroNoMask.toString()} >{item.numeroMask}</Text>
                  }
                  keyExtractor={({item, index}) => index}
                />
            </View>
        )
    }
    
}

export default withNavigationFocus(Recents);