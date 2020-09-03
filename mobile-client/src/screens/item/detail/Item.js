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
  Textarea
} from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findById, save } from '../../../actions/item';
import CustomHeader from '../../../components/CustomHeader';
import { showError } from '../../../utils/toast';
import styles from '../../styles';

class FormItem extends Component {
  constructor(props) {
    super(props);

    const { route } = this.props;
    this.state = {
      id: route.params?.id,
      name: '',
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
    this.props.save(this.state);
  };

  render() {
    const { navigation, loading, saveError } = this.props;
    const { id, name, description } = this.state;

    const errorData = saveError?.data;

    return (
      <Container>
        <CustomHeader navigation={navigation} title="Item" />
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
              <Item floatingLabel error={errorData?.name != null}>
                <Label>Name</Label>
                <Input
                  style={{ padding: 10 }}
                  value={name}
                  onChangeText={value => this.onChange('name', value)}
                />
              </Item>
              {errorData?.name && (
                <Text style={styles.error}> {errorData.name[0]} </Text>
              )}
            </View>

            <View style={styles.inputDefault}>
              <Content>
                <Form>
                  <Label>Description</Label>
                  <Textarea
                    value={description}
                    rowSpan={5}
                    bordered
                    placeholder="Description"
                    onChangeText={value => this.onChange('description', value)}
                  />
                </Form>
                {errorData?.description && (
                  <Text style={styles.error}>{errorData.description[0]}</Text>
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

FormItem.propTypes = {
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
  savedData: state.saveItem.data,
  saveError: state.saveItem.error,
  data: state.itemId.data,
  loading: state.itemId.loading || state.saveItem.loading,
  error: state.itemId.error
});

const mapDispatchToProps = {
  findById,
  save
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormItem);
