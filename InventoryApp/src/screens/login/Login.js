import React, { Component } from 'react';
import {
  Container,
  Content,
  Button,
  Text,
  Item,
  Input,
  Form
} from 'native-base';
import PropTypes from 'prop-types';
import CustomHeader from '../../components/CustomHeader';
import { Image, View } from 'react-native';
import styles from '../styles';
export default class Login extends Component {
  render() {
    const { navigation } = this.props;

    return (
      <Container>
        <CustomHeader hideLeftButton={true} />
        <Content style={{ backgroundColor: '#ffd369' }}>
          <View style={styles.logoContainer}>
            <View style={styles.shadow}>
              <Image
                source={require('../../../assets/images/logo.png')}
                style={styles.frontLogo}
                resizeMode="contain"
              />
            </View>
          </View>
          <Form style={styles.formLogin}>
            <Item rounded style={styles.formLoginInput}>
              <Input autoFocus selectionColor placeholder="Username" />
            </Item>
            <Item rounded style={styles.formLoginInput}>
              <Input placeholder="Password" />
            </Item>
            <Button
              style={styles.formLoginButton}
              full
              rounded
              title="Login"
              onPress={() => navigation.navigate('Main')}
            >
              <Text>Login</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

Login.propTypes = {
  navigation: PropTypes.any
};
