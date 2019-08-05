import React, {Component} from 'react';
import Routes from './routes';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
  'Warning: componentWillReceiveProps is deprecated',
]);

export default class App extends Component{

    render(){
        return (
            <Routes />
        )
    }
}