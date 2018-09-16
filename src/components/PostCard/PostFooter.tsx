import MyIcon from '@elements/Icon';
import { Button, Icon, Left, Right, Text } from 'native-base';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default ({
  likesCount,
  commentsCount,
  isLiked,
  like,
  dislike,
  bookmark,
  navigateToPost
}) => {
  const handlelike = () => {
    if (isLiked) dislike();
    else like();
  };
  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <Left>
        <TouchableOpacity style={styles.button} onPress={handlelike}>
          {isLiked ? (
            <Icon name="heart" type="Entypo" style={{ color: 'red' }} fontSize={25} />
          ) : (
            <Icon name="heart-outlined" type="Entypo" fontSize={25} />
          )}
          <Text style={{ fontSize: 12 }}>{likesCount}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={navigateToPost}>
          <MyIcon name="comment" size={25} />
          <Text style={{ fontSize: 12 }}>{commentsCount}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <MyIcon name="share" size={25} />
        </TouchableOpacity>
      </Left>
      <Right>
        <TouchableOpacity style={styles.button} onPress={bookmark}>
          <MyIcon name="bookmark" size={25} />
        </TouchableOpacity>
      </Right>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  }
});
