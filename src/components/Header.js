import React, { Component } from 'react';
import styled from 'styled-components/native';

export default class Header extends Component {

    render(){

        return(
            <Container>
                <Title>{this.props.title}</Title>
            </Container>   
        )

    }

}

const Container = styled.View`
    background-color: #128c7e;
    height: 50px;
    justify-content: center;
    align-items: center;
`
const Title = styled.Text`
    color: #FFF;
    font-size: 20px;
`