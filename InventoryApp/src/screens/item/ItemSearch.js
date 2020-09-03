import { Button, Container, Icon, Input, Item } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Alert, RefreshControl, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { find } from '../../actions/item';
import CustomHeader from '../../components/CustomHeader';
import RowItem from '../../components/RowItem';
import { showError } from '../../utils/toast';
import styles from '../styles';

class ItemSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      total: 0,
      search: '',
      params: {
        search: '',
        sort: 'asc',
        page: 0,
        size: 20
      }
    };
  }
  componentDidMount() {
    this.reload(this.state.params);
  }

  componentDidUpdate(prevProps) {
    const { data, error, saveData, deleteData, deleteError } = this.props;
    if (prevProps.data !== data) {
      this.setState({
        data: [...this.state.data, ...data?.list],
        total: data.total,
        search: this.state.params.search,
        params: {
          ...this.state.params,
          page: data.page
        }
      });
    } else if (
      prevProps.deleteData !== deleteData ||
      prevProps.saveData !== saveData
    ) {
      this.onRefresh();
    } else if (error && prevProps.error !== error) {
      showError(error);
    } else if (deleteError && prevProps.deleteError !== deleteError) {
      showError(deleteError);
    }
  }

  reload({ search, sort = 'asc', page = 0 } = {}) {
    this.props.find({ search: { name: search }, sort, page });
  }

  onRefresh = () => {
    const { params } = this.state;
    this.setState(
      {
        data: [],
        total: 0,
        params: { ...params, page: 0 }
      },
      () => this.reload(this.state.params)
    );
  };

  onEndReached = () => {
    const { data, total, params } = this.state;

    if (data.length < total) {
      this.reload({
        ...params,
        page: params.page + 1
      });
    }
  };

  onSearch = () => {
    const { search, params } = this.state;
    this.setState(
      {
        data: [],
        total: 0,
        params: { ...params, search: search, page: 0 }
      },
      () => this.reload(this.state.params)
    );
  };
  onChangeText = () => {};

  onDelete = item => {
    Alert.alert(
      'Confirmation',
      'Delete this item?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        { text: 'OK', onPress: () => this.props.deleteById(item.id) }
      ],
      { cancelable: true }
    );
  };

  onShowForm = item => {
    this.props.navigation.navigate('ItemDetail', item ? { id: item.id } : null);
  };
  render() {
    const { navigation, route, loading } = this.props;
    const { data, search } = this.state;
    const { type } = route.params;

    return (
      <Container>
        <CustomHeader navigation={navigation} title="Items" />
        <View style={styles.content}>
          <Item>
            <Input
              placeholder="Search"
              value={search}
              onChangeText={search => this.setState({ search })}
            />
            <Button transparent onPress={this.onSearch}>
              <Icon active name="search" />
            </Button>
          </Item>
          <FlatList
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={this.onRefresh} />
            }
            data={data}
            renderItem={({ item }) => (
              <RowItem
                key={'data' + item.name}
                item={item}
                route={route}
                navigation={navigation}
                type={type}
              />
            )}
            keyExtractor={item => item.id.toString()}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={0.5}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>
      </Container>
    );
  }
}

ItemSearch.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.any,
    total: PropTypes.any
  }),
  deleteById: PropTypes.func,
  deleteData: PropTypes.any,
  deleteError: PropTypes.any,
  error: PropTypes.any,
  find: PropTypes.func,
  loading: PropTypes.any,
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  }),
  route: PropTypes.shape({
    params: PropTypes.any
  }),
  saveData: PropTypes.any
};

const mapStateToProps = state => ({
  data: state.itemsSearch.data,
  loading: state.itemsSearch.loading,
  error: state.itemsSearch.error
});

const mapDispatchToProps = {
  find
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemSearch);
