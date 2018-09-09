import { Thumbnail } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { scale } from 'react-native-size-matters';
import I18n from 'src/utils/i18n';

class Logo extends Component {
  public render() {
    return (
      <View style={styles.logoView}>
        <Thumbnail style={styles.logo} square={true} source={require('@assets/images/logo.png')} />
        <Text>{I18n.t('appName')}</Text>
      </View>
    );
  }
}

interface Styles {
  logo: ViewStyle;
  logoView: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  logoView: {
    alignItems: 'center',
    marginVertical: scale(20)
  },
  logo: {
    marginBottom: 3
  }
});
export default Logo;
