import PropTypes from 'prop-types';
import React from 'react';
import {
  ListItem,
  Body,
  Card,
  CardItem,
  Left,
  Text,
  Thumbnail
} from 'native-base';
import TransactionTypeLabel from '../TransactionTypeLabel';
import moment from 'moment';
import convertIDR from '../../utils/convertIDR';
import styles from '../styles';

export default function RowItem({ navigation, route, item, type }) {
  if (type === 'transaction') {
    return (
      <ListItem
        style={styles.item}
        onPress={() =>
          navigation.navigate('FormTransaction', item ? { id: item.id } : null)
        }
      >
        <Body>
          <Card name="row" style={{ borderRadius: 10 }}>
            <CardItem>
              <Left>
                {TransactionTypeLabel(item.type)}
                <Body>
                  <Text style={styles.titleName}>
                    {convertIDR(item.amount)}
                  </Text>
                  <Text style={styles.description}>Description:</Text>
                  <Text style={styles.description}>
                    {item.description.length < 50
                      ? item.description
                      : item.description.substr(0, 50) + '...'}
                  </Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem style={{ flexDirection: 'row-reverse' }} footer bordered>
              <Text>{moment(item.createdDate).format('YYYY/MM/DD')}</Text>
            </CardItem>
          </Card>
        </Body>
      </ListItem>
    );
  } else if (type === 'item') {
    return (
      <ListItem
        style={styles.item}
        onPress={() =>
          navigation.navigate('FormItem', item ? { id: item.id } : null)
        }
      >
        <Body>
          <Card name="row" style={{ borderRadius: 10 }}>
            <CardItem>
              <Left>
                {item.images.length !== 0 ? (
                  <Thumbnail square source={{ uri: item.images[0]?.url }} />
                ) : (
                  <Thumbnail
                    square
                    source={require('../../../assets/images/noImage.png')}
                  />
                )}
                <Body>
                  <Text style={styles.titleName}>{item.name}</Text>
                  <Text style={styles.description}>Description:</Text>
                  <Text style={styles.description}>
                    {item.description.length < 50
                      ? item.description
                      : item.description.substr(0, 50) + '...'}
                  </Text>
                </Body>
              </Left>
            </CardItem>
          </Card>
        </Body>
      </ListItem>
    );
  } else if (type === 'unit') {
    return (
      <ListItem
        style={styles.item}
        onPress={() =>
          navigation.navigate('FormUnit', item ? { id: item.id } : null)
        }
      >
        <Body>
          <Card name="row" style={{ borderRadius: 10 }}>
            <CardItem>
              <Left>
                <Body>
                  <Text style={styles.titleName}>{item.name}</Text>
                  <Text style={styles.description}>Description:</Text>
                  <Text style={styles.description}>
                    {item.description.length < 50
                      ? item.description
                      : item.description.substr(0, 50) + '...'}
                  </Text>
                </Body>
              </Left>
            </CardItem>
          </Card>
        </Body>
      </ListItem>
    );
  } else if (type === 'stock') {
    return (
      <ListItem
        style={styles.item}
        onPress={() =>
          navigation.navigate('FormStock', item ? { id: item.id } : null)
        }
      >
        <Body>
          <Card name="row" style={{ borderRadius: 10 }}>
            <CardItem>
              <Left>
                <Body>
                  <Text style={styles.titleName}>
                    {item.qty + ' ' + item.unit.name}
                  </Text>
                  <Text style={styles.itemName}>{item.item.name}</Text>
                  <Text style={styles.description}>Description:</Text>
                  <Text style={styles.description}>
                    {item.item.description.length < 50
                      ? item.item.description
                      : item.item.description.substr(0, 50) + '...'}
                  </Text>
                </Body>
              </Left>
            </CardItem>
          </Card>
        </Body>
      </ListItem>
    );
  } else if (type === 'itemSearch') {
    return (
      <ListItem
        style={styles.item}
        onPress={() =>
          navigation.navigate('FormItem', item ? { id: item.id } : null)
        }
      >
        <Text>{item.name}</Text>
      </ListItem>
    );
  } else if (type === 'unitSearch') {
    return (
      <ListItem
        style={styles.item}
        onPress={() =>
          navigation.navigate('FormUnit', item ? { id: item.id } : null)
        }
      >
        <Text>{item.name}</Text>
      </ListItem>
    );
  } else if (type === 'itemChose') {
    return (
      <ListItem
        style={styles.item}
        onPress={() => {
          route.params.callBackValue(item);

          navigation.goBack();
        }}
      >
        <Text>{item.name}</Text>
      </ListItem>
    );
  } else if (type === 'unitChose') {
    return (
      <ListItem
        style={styles.item}
        onPress={() => {
          route.params.callBackValue(item);

          navigation.goBack();
        }}
      >
        <Text>{item.name}</Text>
      </ListItem>
    );
  }
}

RowItem.propTypes = {
  item: PropTypes.shape({
    amount: PropTypes.number,
    createdDate: PropTypes.string,
    description: PropTypes.shape({
      length: PropTypes.number,
      substr: PropTypes.func
    }),
    id: PropTypes.number,
    type: PropTypes.number
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  }).isRequired,
  type: PropTypes.string.isRequired
};
