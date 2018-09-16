import I18n from '@utils/i18n';
import { Button, Text } from 'native-base';
import React from 'react';
import { View } from 'react-native';

export default ({ isOwner, isFollowed, isPrivate, isRequested }) => {
  if (isOwner) return null;
  let onPress;
  if (isFollowed) {
    onPress = () => {
      this.props.unfollow();
    };
  } else {
    onPress = () => {
      this.props.follow();
    };
  }
  return (
    <View style={{ flexDirection: 'row' }}>
      <Button
        primary={!isFollowed}
        transparent={isFollowed}
        bordered={isFollowed}
        disabled={isRequested}
        block={true}
        style={{ width: '50%', borderRadius: 10 }}
        onPress={onPress}>
        <Text style={{ fontSize: 15 }}>
          {isFollowed
            ? I18n.t('followed')
            : isPrivate
              ? I18n.t('request')
              : isRequested
                ? I18n.t('requested')
                : I18n.t('notFollowed')}
        </Text>
      </Button>
    </View>
  );
};
