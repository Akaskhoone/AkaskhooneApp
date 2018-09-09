import { Text } from 'native-base';
import React from 'react';
import { View } from 'react-native';

export default ({ tags, description }) => (
  <View style={{ flex: 1, justifyContent: 'flex-end' }}>
    <View style={{ direction: 'rtl', alignItems: 'flex-end' }}>
      <Text note={true}>{tags}</Text>
      <Text>{description}</Text>
    </View>
  </View>
);
