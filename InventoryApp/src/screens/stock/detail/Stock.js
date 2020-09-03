import {
  Button,
  Container,
  Content,
  Form,
  Icon,
  Input,
  Item,
  Label,
  Text,
  View
} from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findById, save } from '../../../actions/stock';
import CustomHeader from '../../../components/CustomHeader';
import { showError } from '../../../utils/toast';
import styles from '../../styles';

class FormStock extends Component {
  constructor(props) {
    super(props);

    const { route } = this.props;
    this.state = {
      id: route.params?.id,
      qty: '',
      item: {},
      unit: {}
    };
  }

  componentDidMount() {
    const { id } = this.state;
    if (id) {
      this.props.findById(this.state.id);
    }
  }

  componentDidUpdate(prevProps) {
    const { navigation, savedData, saveError, data, error } = this.props;

    if (prevProps.data !== data) {
      this.setState({ ...data });
    } else if (prevProps.savedData !== savedData) {
      navigation.goBack();
    } else if (error && prevProps.error !== error) {
      showError(error);
    } else if (saveError && prevProps.saveError !== saveError) {
      showError(saveError);
    }
  }

  onChange = (name, value) => {
    this.setState({ [name]: value });
  };

  onSubmit = () => {
    this.props.save(this.state);
  };

  onOpenItemChose = () => {
    this.props.navigation.navigate('ItemSearch', {
      callBackValue: this.onItemChose,
      type: 'itemChose'
    });
  };

  onItemChose = item => {
    this.setState({ item: item });
  };

  onOpenUnitChose = () => {
    this.props.navigation.navigate('UnitSearch', {
      callBackValue: this.onUnitChose,
      type: 'unitChose'
    });
  };

  onUnitChose = unit => {
    this.setState({ unit: unit });
  };

  render() {
    const { navigation, loading, saveError } = this.props;
    const { id, qty, item, unit } = this.state;
    console.log('qty', qty);

    const errorData = saveError?.data;

    return (
      <Container>
        <CustomHeader navigation={navigation} title="Stock" />
        <Content style={styles.content}>
          <Form>
            {id && (
              <View style={styles.inputDefault}>
                <Item floatingLabel>
                  <Label>ID</Label>
                  <Input disabled value={id.toString()} />
                </Item>
              </View>
            )}
            <View style={styles.inputDefault}>
              <Item
                floatingLabel
                error={errorData?.name != null}
                onPress={this.onOpenItemChose}
              >
                <Label>Item</Label>
                <Input
                  disabled
                  style={{ padding: 10 }}
                  value={item.name}
                  onChangeText={value => this.onChange('item.name', value)}
                />
                <Icon type="FontAwesome" name="angle-down" />
              </Item>
              {errorData?.name && (
                <Text style={styles.error}> {errorData.name[0]} </Text>
              )}
            </View>

            <View style={styles.inputDefault}>
              <Item floatingLabel error={errorData?.name != null}>
                <Label>Quantity</Label>
                <Input
                  maxLength={4}
                  keyboardType="phone-pad"
                  style={{ padding: 10 }}
                  value={qty.toString()}
                  onChangeText={value => this.onChange('qty', value)}
                />
              </Item>
              {errorData?.name && (
                <Text style={styles.error}> {errorData.name[0]} </Text>
              )}
            </View>

            <View style={styles.inputDefault}>
              <Item
                floatingLabel
                error={errorData?.name != null}
                onPress={this.onOpenUnitChose}
              >
                <Label>Unit</Label>
                <Input
                  disabled
                  style={{ padding: 10 }}
                  value={unit.name}
                  onChangeText={value => this.onChange('unit.name', value)}
                />
                <Icon type="FontAwesome" name="angle-down" />
              </Item>
              {errorData?.name && (
                <Text style={styles.error}> {errorData.name[0]} </Text>
              )}
            </View>
            <Button
              style={styles.button}
              full
              onPress={this.onSubmit}
              disabled={loading}
            >
              <Text>Save</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

FormStock.propTypes = {
  data: PropTypes.any,
  error: PropTypes.any,
  findById: PropTypes.any,
  loading: PropTypes.any,
  navigation: PropTypes.object,
  route: PropTypes.shape({
    params: PropTypes.any
  }),
  save: PropTypes.any,
  saveError: PropTypes.any,
  savedData: PropTypes.any
};

const mapStateToProps = state => ({
  savedData: state.saveStock.data,
  saveError: state.saveStock.error,
  data: state.stockId.data,
  loading: state.stockId.loading || state.saveStock.loading,
  error: state.stockId.error
});

const mapDispatchToProps = {
  findById,
  save
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormStock);
