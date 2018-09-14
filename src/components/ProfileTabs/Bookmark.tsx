import I18n from '@utils/i18n';
import { Card, CardItem, Content, Left, Right, Thumbnail } from 'native-base';
import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { selectors } from 'src/reducers';
import { BoardDTO, PostDTO } from 'src/utils/interfaces';

interface OwnProps {
  boardId: string;
}
interface StateProps {
  board: BoardDTO;
  getPost: (string) => PostDTO;
}
interface DispatchProps {}
type Props = OwnProps & StateProps & DispatchProps;

export class Bookmark extends Component<Props> {
  public render() {
    const { board } = this.props;
    const thumbnailComponents = board.data
      .map(postId => this.props.getPost(postId))
      .map(this.renderThumbnail);
    return (
      <Content>
        <Card transparent={true}>
          <CardItem>
            <Left>
              <Text>{I18n.t('allBookmarks')}</Text>
            </Left>
            <Right>
              <Text>{board.name}</Text>
            </Right>
          </CardItem>
          <CardItem cardBody={true}>
            <ScrollView horizontal={true} style={{ flex: 1, height: 100 }}>
              {thumbnailComponents}
            </ScrollView>
          </CardItem>
        </Card>
      </Content>
    );
  }

  private renderThumbnail = (post, index) => (
    <Thumbnail
      key={index}
      style={styles.image}
      square={true}
      large={true}
      source={{ uri: post.image }}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 10,
    margin: 10
  }
});

const mapStateToProps = (state, ownProps: OwnProps): StateProps => ({
  board: selectors.boards.getData(state, ownProps.boardId),
  getPost: postId => selectors.posts.getData(state, postId)
});
export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps)(Bookmark);
