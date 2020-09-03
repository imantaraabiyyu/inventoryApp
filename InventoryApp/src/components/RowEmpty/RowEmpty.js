import { Body, ListItem } from 'native-base';
import React from 'react';
import { ImageBackground } from 'react-native';

export default function RowEmpty() {
  return (
    <ListItem style={{ borderBottomColor: 'white' }}>
      <Body>
        <ImageBackground
          style={{ width: 280, height: 400, alignSelf: 'center' }}
          source={require('../../../assets/images/noResult.png')}
        />
      </Body>
    </ListItem>
  );
}
