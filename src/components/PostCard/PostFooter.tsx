import MyIcon from '@elements/Icon';
import { Button, Left, Right, Text } from 'native-base';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default ({ likes, comments, liked }) => (
  <View style={{ flex: 1, flexDirection: 'row' }}>
    <Left>
      <TouchableOpacity style={styles.button}>
        <MyIcon name="like" size={25} />
        <Text style={{ fontSize: 12 }}>{likes}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <MyIcon name="comment" size={25} />
        <Text style={{ fontSize: 12 }}>{comments}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <MyIcon name="share" size={25} />
      </TouchableOpacity>
    </Left>
    <Right>
      <TouchableOpacity style={styles.button}>
        <MyIcon name="bookmark" size={25} />
      </TouchableOpacity>
    </Right>
  </View>
);
const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  }
});
