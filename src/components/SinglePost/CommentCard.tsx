import { CardItem, Text, Thumbnail } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { selectors } from 'src/reducers';
import { humanify } from 'src/utils/helpers';
import I18n from 'src/utils/i18n';
import { CommentDTO, ProfileDTO } from 'src/utils/interfaces';

interface OwnProps {
  commentId: string;
}
interface StateProps {
  comment: CommentDTO;
  creator: ProfileDTO;
}
interface DispatchProps {}
type Props = OwnProps & StateProps & DispatchProps;
const CommentCard = ({ comment, creator }: Props) => (
  <CardItem style={styles.mainContainer}>
    <View style={styles.infoContainer}>
      <View style={styles.headerInfoContainer}>
        <Text style={styles.userText}>{creator.username}</Text>
        <Text note={true} style={{ textAlignVertical: 'center' }}>
          {humanify(comment.date)}
        </Text>
        <View style={{ flex: 1 }} />
        <Text style={{ fontSize: 9 }}>{I18n.t('answer')}</Text>
      </View>
      <View style={styles.desContainer}>
        <Text style={{ textAlign: 'right' }}>{comment.text}</Text>
      </View>
    </View>
    <View style={{ paddingLeft: 10 }}>
      <Thumbnail small={true} source={{ uri: creator.image }} />
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

const mapStateToProps = (state, ownProps: OwnProps): StateProps => {
  const comment = selectors.comments.getData(state, ownProps.commentId);
  const creator = selectors.profiles.getData(state, comment.creator);
  return {
    comment,
    creator
  };
};
export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps)(CommentCard);
