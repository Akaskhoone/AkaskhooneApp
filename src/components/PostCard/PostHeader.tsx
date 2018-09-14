import MyIcon from '@elements/Icon';
import { humanify } from '@utils/helpers';
import { Button, Icon, Text, Thumbnail } from 'native-base';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { selectors } from 'src/reducers';
import { ProfileDTO } from 'src/utils/interfaces';
import NavigationService from 'src/utils/NavigationService';

interface OwnProps {
  location: string;
  date: string;
  creatorUsername: string;
}
interface StateProps {
  creator: ProfileDTO;
}
interface DispatchProps {}
type Props = OwnProps & StateProps & DispatchProps;

const PostHeader = ({ location, date, creator, creatorUsername }: Props) => {
  const handlePress = () => {
    NavigationService.navigateToProfile(creatorUsername);
  };
  return (
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
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center' }}
        onPress={handlePress}
      >
        <View style={{ marginRight: 10, marginLeft: 15, alignItems: 'flex-end' }}>
          <Text style={{ fontWeight: 'bold' }}>{creator.username}</Text>
          <Text note={true}>{humanify(date)}</Text>
        </View>
        <View>
          <Thumbnail small={true} source={{ uri: creator.image }} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (state, ownProps: OwnProps): StateProps => ({
  creator: selectors.profiles.getData(state, ownProps.creatorUsername)
});
export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps)(PostHeader);
