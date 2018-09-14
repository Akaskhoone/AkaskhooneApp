import I18n from '@utils/i18n';
import { Card, CardItem, Left, Right, Thumbnail } from 'native-base';
import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { selectors } from 'src/reducers';
import { BoardDTO, PostDTO } from 'src/utils/interfaces';
import NavigationService from 'src/utils/NavigationService';

interface OwnProps {
  boardId: string;
  username: string;
}
interface StateProps {
  board: BoardDTO;
  getPost: (string) => PostDTO;
  isOwner: boolean;
}
interface DispatchProps {}
type Props = OwnProps & StateProps & DispatchProps;

export class Bookmark extends Component<Props> {
  public render() {
    const { board, isOwner } = this.props;

    return (
      <Card transparent={true}>
        <CardItem>
          <Left>
            <TouchableWithoutFeedback
              onPress={this.navigateTo('board', { isOwner, boardId: this.props.boardId })}
            >
              <View>
                <Text>{I18n.t('allBookmarks')}</Text>
              </View>
            </TouchableWithoutFeedback>
          </Left>
          <Right>
            <Text>{board.name}</Text>
          </Right>
        </CardItem>
        <CardItem cardBody={true}>
          <FlatList
            data={board.posts}
            renderItem={this.renderThumbnail}
            horizontal={true}
            style={{ flex: 1, height: 100 }}
            keyExtractor={this.keyExtractor}
          />
        </CardItem>
      </Card>
    );
  }

  private navigateTo = (routeName, params) => () => NavigationService.push(routeName, params);
  private keyExtractor = a => `${a}`;
  private renderThumbnail = ({ item: postId, index }) => {
    const post = this.props.getPost(postId);
    return (
      <TouchableOpacity onPress={this.navigateTo('post', { postId: post.id })}>
        <Thumbnail style={styles.image} square={true} large={true} source={{ uri: post.image }} />
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 10,
    margin: 10
  }
});

const mapStateToProps = (state, ownProps: OwnProps): StateProps => ({
  board: selectors.boards.getData(state, ownProps.boardId),
  getPost: postId => selectors.posts.getData(state, postId),
  isOwner: selectors.isOwner(state, ownProps.username)
});
export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps)(Bookmark);
