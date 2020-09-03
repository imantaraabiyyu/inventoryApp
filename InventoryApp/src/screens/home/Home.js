import React, { Component } from 'react';
import { Container, Content, Text } from 'native-base';
import PropTypes from 'prop-types';
import CustomHeader from '../../components/CustomHeader';
import CardSilder from 'react-native-cards-slider';
import { View } from 'react-native';
export default class Home extends Component {
  render() {
    return (
      <Container>
        <CustomHeader
          title="Home"
          navigation={this.props.navigation}
          showRightButton={true}
          hideLeftButton={true}
          rightButtonType="logout"
        />
        <Content>
          <View>
            <CardSilder style={{ marginTop: 30 }}>
              <View
                style={{
                  height: 170,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'skyblue'
                }}
              >
                <Text
                  style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}
                >
                  悉尼
                </Text>
              </View>
              <View
                style={{
                  height: 170,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'lightsalmon'
                }}
              >
                <Text
                  style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}
                >
                  纽约
                </Text>
              </View>
              <View
                style={{
                  height: 170,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'teal'
                }}
              >
                <Text
                  style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}
                >
                  东京
                </Text>
              </View>
              <View
                style={{
                  height: 170,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'lightpink'
                }}
              >
                <Text
                  style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}
                >
                  上海
                </Text>
              </View>
            </CardSilder>
          </View>
        </Content>
      </Container>
    );
  }
}

Home.propTypes = {
  navigation: PropTypes.object
};
