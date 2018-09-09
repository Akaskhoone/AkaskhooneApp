import { CardItem, Text, Thumbnail } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { humanify } from 'src/utils/helpers';
import I18n from 'src/utils/i18n';

export default ({ data: { creator, date, text } }) => (
  <CardItem style={styles.mainContainer}>
    <View style={styles.infoContainer}>
      <View style={styles.headerInfoContainer}>
        <Text style={styles.userText}>{creator.name}</Text>
        <Text note={true} style={{ textAlignVertical: 'center' }}>
          {humanify(date)}
        </Text>
        <View style={{ flex: 1 }} />
        <Text style={{ fontSize: 9 }}>{I18n.t('answer')}</Text>
      </View>
      <View style={styles.desContainer}>
        <Text style={{ textAlign: 'right' }}>{text}</Text>
      </View>
    </View>
    <View style={{ paddingLeft: 10 }}>
      <Thumbnail small={true} source={{ uri: 'https://via.placeholder.com/200x200' }} />
    </View>
  </CardItem>
);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#EFEFEF'
  },
  infoContainer: {
    flex: 1
  },
  headerInfoContainer: {
    width: '100%',
    flexDirection: 'row-reverse',
    alignItems: 'center'
  },
  desContainer: {
    flex: 1,
    alignItems: 'flex-end'
  },
  userText: {
    marginLeft: 5
  }
});
