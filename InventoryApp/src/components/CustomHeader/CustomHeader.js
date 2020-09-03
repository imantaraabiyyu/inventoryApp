import {
  Body,
  Button,
  Grid,
  Header,
  Icon,
  Left,
  Right,
  Text,
  Title
} from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';
import styles from '../styles';

export default class CustomHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterShow: false
    };
    this.filterShow = this.filterShow.bind(this);
  }
  onBackPress = () => {
    this.props.navigation.goBack();
  };

  onLogoutPress = () => {
    console.log('aaaaaaaaaaaaa');

    this.props.navigation.navigate('Login');
  };

  onSearch = category => {
    if (category === 'Items') {
      this.props.navigation.navigate('ItemSearch', { type: 'itemSearch' });
    } else if (category === 'Units') {
      this.props.navigation.navigate('UnitSearch', { type: 'unitSearch' });
    }
  };

  rightButtonSelector = (rightButtonType, search) => {
    if (rightButtonType === 'logout') {
      return (
        <Button transparent onPress={this.onLogoutPress}>
          <Text>Logout</Text>
        </Button>
      );
    } else if (rightButtonType === 'search') {
      return (
        <Button transparent onPress={() => this.onSearch(search)}>
          <Icon active name="search" />
        </Button>
      );
    } else if (rightButtonType === 'filterTransaction') {
      return (
        <View style={styles.container}>
          <Grid container direction="row">
            <Button transparent onPress={this.filterShow}>
              <Icon type="AntDesign" name="filter" />
              <Text>FILTER</Text>
            </Button>
          </Grid>
        </View>
      );
    }
  };

  updateFilterChange() {
    this.props.handleFilterChange(this.state);
  }

  filterShow = () => {
    this.setState({ filterShow: true }, this.updateFilterChange);
  };

  render() {
    const {
      title,
      hideLeftButton,
      showRightButton,
      rightButtonType,
      search
    } = this.props;
    return (
      <Header style={{ backgroundColor: '#ffd369' }}>
        <View>
          <StatusBar backgroundColor="#ffd369" barStyle="dark-content" />
        </View>
        {!hideLeftButton && (
          <Left>
            <Button transparent onPress={this.onBackPress}>
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>
        )}
        <Body>
          <Title>{title}</Title>
        </Body>
        {showRightButton && (
          <Right>{this.rightButtonSelector(rightButtonType, search)}</Right>
        )}
      </Header>
    );
  }
}

CustomHeader.propTypes = {
  handleFilterChange: PropTypes.func,
  hideLeftButton: PropTypes.any,
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
    navigate: PropTypes.func
  }),
  rightButtonType: PropTypes.any,
  search: PropTypes.any,
  showRightButton: PropTypes.any,
  title: PropTypes.string
};
