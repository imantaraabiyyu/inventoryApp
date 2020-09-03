import {
  Button,
  Container,
  Content,
  Form,
  Input,
  Item,
  Label,
  Text,
  View,
  Picker,
  Icon,
  Textarea
} from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findById, save } from '../../../actions/transaction';
import CustomHeader from '../../../components/CustomHeader';
import { showError } from '../../../utils/toast';
import styles from '../../styles';
import NumberFormat from 'react-number-format';
import { TextInput } from 'react-native';

class FormTransaction extends Component {
  constructor(props) {
    super(props);

    const { route } = this.props;
    this.state = {
      id: route.params?.id,
      amount: '',
      type: 1,
      description: ''
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
    this.props.save({
      ...this.state,
      amount: +this.state.userInput.value.replace(/\D/g, '')
    });
  };

  inputChangedHandler = values => {
    this.setState({
      userInput: values
    });
  };

  onValueChange(value) {
    this.setState({
      ...this.state,
      type: value
    });
  }

  handleChange = amount => {
    this.setState({ amount });
  };

  render() {
    const { navigation, loading, saveError } = this.props;
    const { id, amount, description } = this.state;

    const errorData = saveError?.data;
    return (
      <Container>
        <CustomHeader navigation={navigation} title="Transaction" />
        <Content style={styles.content}>
          <Form>
            {id && (
              <Item floatingLabel>
                <Label>ID</Label>
                <Input style={styles.input} disabled value={id.toString()} />
              </Item>
            )}
            <View style={styles.inputDefault}>
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
                selectedValue={this.state.type}
                onValueChange={this.onValueChange.bind(this)}
              >
                <Picker.Item label="Purchase" value="0" />
                <Picker.Item label="Selling" value="1" />
                <Picker.Item label="Payday" value="2" />
              </Picker>
              {errorData?.name && (
                <Text style={styles.error}> {errorData.name[0]} </Text>
              )}
            </View>
            <View style={styles.inputDefault}>
              <Label>Amount</Label>

              <NumberFormat
                value={amount}
                displayType={'text'}
                thousandSeparator={'.'}
                decimalSeparator={','}
                prefix={'Rp.'}
                onValueChange={this.inputChangedHandler}
                renderText={value => {
                  return (
                    <TextInput
                      maxLength={13}
                      underlineColorAndroid="#d3d3d3"
                      value={value}
                      style={styles.textInput}
                      onChangeText={this.handleChange}
                      keyboardType="phone-pad"
                    />
                  );
                }}
              />
            </View>

            <View style={styles.inputDefault}>
              <Content>
                <Form>
                  <Textarea
                    value={description}
                    rowSpan={5}
                    bordered
                    placeholder="Description"
                    onChangeText={value => this.onChange('description', value)}
                  />
                </Form>
                {errorData?.description && (
                  <Text style={styles.error}> {errorData.description[0]} </Text>
                )}
              </Content>
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

FormTransaction.propTypes = {
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
  savedData: state.saveTransaction.data,
  saveError: state.saveTransaction.error,
  data: state.transactionId.data,
  loading: state.transactionId.loading || state.saveTransaction.loading,
  error: state.transactionId.error
});

const mapDispatchToProps = {
  findById,
  save
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormTransaction);
