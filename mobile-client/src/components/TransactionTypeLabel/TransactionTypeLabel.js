import React from 'react';
import { Button, Text } from 'native-base';

export default function TransactionTypeLabel(type) {
  if (type === 0) {
    return (
      <Button small rounded>
        <Text>Purchase</Text>
      </Button>
    );
  } else if (type === 1) {
    return (
      <Button small rounded success>
        <Text>Selling</Text>
      </Button>
    );
  } else if (type === 2) {
    return (
      <Button small rounded warning>
        <Text>Payday</Text>
      </Button>
    );
  }
}
