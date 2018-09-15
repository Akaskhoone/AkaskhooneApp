import ImageItem from '@elements/ImageItem';
import Paginator, { getActionsFor } from '@libs/Paginator';
import { Button, Text, Toast } from 'native-base';
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { selectors } from 'src/reducers';
import I18n from 'src/utils/i18n';
import { PostDTO } from 'src/utils/interfaces';
import NavigationService from 'src/utils/NavigationService';

interface OwnProps {
  boardId: string;
}
interface StateProps {
  username: string;
  getPost: (string) => PostDTO;
}
interface DispatchProps {
  addToBoard: (images: string[]) => any;
}
interface State {
  selecteds: string[];
  submitting: boolean;
}
type Props = OwnProps & StateProps & DispatchProps;

export class AddToBoard extends Component<Props, State> {
  public state = {
    selecteds: [],
    submitting: false
  };
  public render() {
    const { username } = this.props;
    const buttonShouldDisable = this.state.selecteds.length === 0 || this.state.submitting;
    return (
      <View style={{ flex: 1 }}>
        <Paginator
          defaultComponent={this.defaultComponent}
          name={`${username}_posts`}
          type="posts"
          url={`/social/posts/?username=${username}`}
          renderItem={this.renderItem}
          numColumns={2}
          extraData={this.state}
        />
        <Button
          block={true}
          rounded={true}
          large={true}
          disabled={buttonShouldDisable}
          style={{ marginHorizontal: 10, position: 'absolute', left: 0, right: 0, bottom: 10 }}
          onPress={this.submit}>
          <Text>{I18n.t('addToBoard')}</Text>
        </Button>
      </View>
    );
  }
  private defaultComponent = () => <View />;
  private renderItem = ({ item: postId, index }) => {
    const post = this.props.getPost(postId);
    const isSelected = this.state.selecteds.findIndex(id => id === postId) >= 0;
    return (
      <ImageItem
        item={post}
        imageExtractor={this.imageExtractor}
        imagesPerRow={2}
        index={index}
        selected={isSelected}
        onPress={this.handlePress}
      />
    );
  };
  private submit = () => {
    this.setState({ submitting: true }, () => {
      this.props
        .addToBoard(this.state.selecteds)
        .then(() => Toast.show({ text: I18n.t('imageAddedSuccessfully') }))
        .then(this.goBack())
        .catch(() => Toast.show({ text: I18n.t('unknownError') }))
        .then(() => this.setState({ submitting: false }));
    });
  };
  private imageExtractor = post => ({ uri: post.image });
  private handlePress = post => {
    const postIndex = this.state.selecteds.findIndex(id => id === post.id);
    if (postIndex >= 0) {
      this.unselect(post.id);
    } else {
      this.select(post.id);
    }
  };
  private select = postId => {
    this.setState(prevState => ({
      selecteds: [...prevState.selecteds, postId]
    }));
  };
  private unselect = postId => {
    this.setState(prevState => ({
      selecteds: prevState.selecteds.filter(id => id !== postId)
    }));
  };
  private goBack = () => NavigationService.goBack();
}

const mapStateToProps = (state): StateProps => {
  return {
    username: selectors.getOwner(state).username,
    getPost: postId => selectors.posts.getData(state, postId)
  };
};
const mapDispatchToProps = (dispatch, ownProps: OwnProps): DispatchProps => {
  const boardActions = getActionsFor('boards');
  const boardEndpoint = boardActions.createEndpoint(`/social/boards/`);
  return {
    addToBoard: selectedPosts =>
      dispatch(boardEndpoint.updateItem(`${ownProps.boardId}/`, { add_posts: selectedPosts }))
  };
};
export default connect<StateProps, DispatchProps, OwnProps, State>(
  mapStateToProps,
  mapDispatchToProps
)(AddToBoard);
