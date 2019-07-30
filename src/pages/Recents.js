import React, { Component } from 'react';
import { View, Text, Button, Linking } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { withNavigationFocus } from 'react-navigation';


class Recents extends Component{

    constructor(props) {
        super(props);
        this.state = {
            numbersList: null
        }
    }

    async componentDidMount() {
      try {
        this.getStorage();
      } catch (error) {
          console.log("Error saving data" + error);
      }
  }

  componentDidUpdate(prevProps) {
    if (this.props.isFocused && !prevProps.isFocused) {
      this.getStorage();
    }
  }

  async getStorage(){
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
  }

  listNumbers(){
    console.log('called');
    if (this.state.numbersList !== null) {
      this.state.numbersList.map( (data, key) => {
        return( <Text key={key}>{data}</Text> )
      })
    }
  }

    

    render(){

        return(
            <View>
                <Text>{`I'm Recentes Component`}</Text>
                <Text onPress={ () => { 
                    Linking.openURL('http://api.whatsapp.com/send?phone=55' + this.state.numbersList); }}>
                Stored key is = {this.state.numbersList}
                </Text>
                {this.listNumbers()}
            </View>
        )
    }
    
}

export default withNavigationFocus(Recents);