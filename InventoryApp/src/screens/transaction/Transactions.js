import moment from 'moment';
import {
  Button,
  Container,
  DatePicker,
  Fab,
  Form,
  Icon,
  Picker,
  Text
} from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Alert, Modal, RefreshControl, View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { connect } from 'react-redux';
import { deleteById, findAll } from '../../actions/transaction';
import CustomHeader from '../../components/CustomHeader';
import { showError } from '../../utils/toast';
import styles from '../styles';
import RowItem from '../../components/RowItem';
import RowEmpty from '../../components/RowEmpty';

class Items extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      data: [],
      total: 0,
      params: {
        sort: 'asc',
        page: 0,
        size: 10,
        type: 4,
        from: null,
        to: null
      },
      modalShow: false
    };

    this.state = this.initialState;
    this.handleFilterChange = this.handleFilterChange.bind(this);
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
        params: {
          ...this.state.params,
          page: data.page,
          from: data.from && null,
          to: data.to && null
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

  reload({ sort = 'asc', page = 0, type, from, to }) {
    this.props.findAll({ sort, page, type, from, to });
  }

  onRefresh = () => {
    this.setState(this.initialState, () => this.reload(this.state.params));
  };

  filterData = () => {
    this.setState({ data: [] }, this.reload(this.state.params));
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

  handleFilterChange(_State) {
    this.setState({
      isFiltered: _State.isFiltered,
      modalShow: _State.filterShow
    });
  }

  setModalVisible = visible => {
    this.setState({ modalShow: visible });
  };

  onValueChange(value) {
    this.setState({
      params: { ...this.state.params, type: value }
    });
  }

  closeFilterModal = () => {
    this.setState({ modalShow: false });
  };

  onShowForm = () => {
    this.props.navigation.navigate('FormTransaction');
  };

  render() {
    const { navigation, loading } = this.props;
    const { data, modalShow, params } = this.state;

    const getFromDate = params.from?.split('-');
    const minimalToDate =
      getFromDate &&
      new Date(getFromDate[0], getFromDate[1] - 1, getFromDate[2]);
    return (
      <Container>
        <CustomHeader
          navigation={navigation}
          title="Transactions"
          hideLeftButton={true}
          showRightButton={true}
          rightButtonType="filterTransaction"
          handleFilterChange={this.handleFilterChange}
        />
        <View style={styles.content}>
          <SwipeListView
            contentContainerStyle={styles.swipeListView}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={this.onRefresh} />
            }
            data={data}
            renderItem={({ item }) => (
              <RowItem navigation={navigation} item={item} type="transaction" />
            )}
            keyExtractor={item => item.id.toString()}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={0.5}
            renderHiddenItem={data => (
              <View style={styles.hiddenItem}>
                <Button
                  style={styles.deleteButton}
                  danger
                  onPress={() => this.onDelete(data.item)}
                >
                  <Icon name="md-trash" />
                </Button>
              </View>
            )}
            rightOpenValue={-75}
            ListEmptyComponent={!loading && <RowEmpty />}
          />
        </View>
        <Fab
          position="bottomRight"
          style={styles.fab}
          onPress={this.onShowForm}
        >
          <Icon name="add" />
        </Fab>
        <View style={styles.centeredView}>
          <Modal animationType="slide" transparent={true} visible={modalShow}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Icon
                  name="close-o"
                  type="EvilIcons"
                  style={{ alignSelf: 'flex-end' }}
                  onPress={this.closeFilterModal}
                />
                <Text style={styles.modalText}>Filter</Text>
                <Form style={{ height: 145 }}>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    placeholder="Transaction Type"
                    textStyle={{ color: '#5cb85c' }}
                    itemStyle={{
                      backgroundColor: '#d3d3d3',
                      marginLeft: 0,
                      paddingLeft: 10,
                      width: 200,
                      height: 50
                    }}
                    itemTextStyle={{ color: '#788ad2' }}
                    style={{ width: 200 }}
                    selectedValue={this.state.params.type}
                    onValueChange={this.onValueChange.bind(this)}
                  >
                    <Picker.Item label="All" value="4" />
                    <Picker.Item label="Purchase" value="0" />
                    <Picker.Item label="Selling" value="1" />
                    <Picker.Item label="Payday" value="2" />
                  </Picker>

                  <DatePicker
                    locale={'en'}
                    animationType={'fade'}
                    androidMode={'default'}
                    placeHolderText="From"
                    textStyle={{ alignSelf: 'center', color: 'green' }}
                    placeHolderTextStyle={{ color: '#d3d3d3' }}
                    formatChosenDate={date => {
                      return moment(date).format('YYYY-MM-DD');
                    }}
                    onDateChange={date =>
                      this.setState({
                        params: {
                          ...this.state.params,
                          from: moment(date).format('YYYY-MM-DD')
                        }
                      })
                    }
                  />

                  <DatePicker
                    locale={'en'}
                    minimumDate={minimalToDate}
                    animationType={'fade'}
                    androidMode={'default'}
                    placeHolderText="To"
                    textStyle={{ alignSelf: 'center', color: 'green' }}
                    placeHolderTextStyle={{ color: '#d3d3d3' }}
                    formatChosenDate={date => {
                      return moment(date).format('YYYY-MM-DD');
                    }}
                    onDateChange={date =>
                      this.setState({
                        params: {
                          ...this.state.params,
                          to: moment(date).format('YYYY-MM-DD')
                        }
                      })
                    }
                  />
                </Form>

                <Button
                  style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                  onPress={() => {
                    this.filterData();
                    this.setModalVisible(!modalShow);
                  }}
                >
                  <Text style={styles.textStyle}>Set Filter</Text>
                </Button>
              </View>
            </View>
          </Modal>
        </View>
      </Container>
    );
  }
}

Items.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.any,
    total: PropTypes.any
  }),
  deleteById: PropTypes.func,
  deleteData: PropTypes.any,
  deleteError: PropTypes.any,
  error: PropTypes.any,
  findAll: PropTypes.func,
  loading: PropTypes.any,
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  }),
  saveData: PropTypes.any
};

const mapStateToProps = state => ({
  data: state.transactions.data,
  deleteData: state.deletedTransactionById.data,
  saveData: state.saveTransaction.data,
  loading: state.transactions.loading || state.deletedTransactionById.loading,
  error: state.transactions.error,
  deleteError: state.deletedTransactionById.error
});

const mapDispatchToProps = {
  findAll,
  deleteById
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Items);
