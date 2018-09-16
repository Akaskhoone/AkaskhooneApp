import { Icon, Text, Thumbnail, View } from 'native-base';
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import Connect from 'react-redux';
import NavigationService from 'src/utils/NavigationService';

interface Props {
  tagName: string;
}
export default class HashtagListItem extends Component<Props> {
  public render() {
    return (
      <TouchableOpacity onPress={this.navigateToTag}>
        <View style={{ flexDirection: 'row-reverse', marginTop: 10, marginHorizontal: 10 }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: 'gray',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <Icon type="Feather" name="hash" fontSize={12} />
          </View>
          <Text style={{ marginTop: 8, marginHorizontal: 15, fontWeight: 'bold', fontSize: 15 }}>
            {this.props.tagName}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
  private navigateToTag = () => NavigationService.push('tag', { tagId: this.props.tagName });
}
