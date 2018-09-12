import MyIcon from '@elements/Icon';
import { humanify } from '@utils/helpers';
import { Button, Icon, Text, Thumbnail } from 'native-base';
import React from 'react';
import { TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

export default ({ location, creator, date, profileUrl, showProfile }) => (
  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
    <TouchableOpacity>
      <View style={{ paddingHorizontal: 8 }}>
        <Icon name="more" fontSize={24} />
      </View>
    </TouchableOpacity>
    <View style={{ flex: 1 }} />
    {location ? (
      <Button transparent={true} iconLeft={true} dark={true}>
        <Text style={{ fontWeight: 'bold' }}>{location}</Text>
        <MyIcon name="location" size={15} />
      </Button>
    ) : null}
    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={showProfile}>
      <View style={{ marginRight: 10, marginLeft: 15, alignItems: 'flex-end' }}>
        <Text style={{ fontWeight: 'bold' }}>{creator}</Text>
        <Text note={true}>{humanify(date)}</Text>
      </View>
      <View>
        <Thumbnail small={true} source={require('@assets/images/defaultProfile.jpg')} />
      </View>
    </TouchableOpacity>
  </View>
);
