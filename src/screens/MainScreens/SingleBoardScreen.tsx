import DeleteModal from '@components/Modals/DeleteBoardModal';
import MyIcon from '@elements/Icon';
import Paginator from '@libs/Paginator/Paginator';
import { selectors } from '@reducers/index';
import { BoardDTO, PostDTO } from '@utils/interfaces';
import { Body, Button, Container, Header, Left, Right, Text, Toast, View } from 'native-base';
import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import ImageItem from 'src/elements/ImageItem';
import { getActionsFor } from 'src/libs/Paginator';
import I18n from 'src/utils/i18n';
import NavigationService from 'src/utils/NavigationService';

interface OwnProps {
  navigation: NavigationScreenProp<any, any>;
}
interface StateProps {
  getPostFromId: (string) => PostDTO;
  board: BoardDTO;
}
interface DispatchProps {
  deleteBoard: any;
}
interface State {
  visible: boolean;
}
type Props = OwnProps & StateProps & DispatchProps;

class BoardScreen extends Component<Props, State> {
  public state = {
    visible: false
  };
  public render() {
    const { board } = this.props;
    const isOwner = this.props.navigation.getParam('isOwner', false);
    return (
      <Container style={{ flex: 1 }}>
        <Header>
          <Left>
            {isOwner && (
              <View style={{ flexDirection: 'row' }}>
                <Button
                  style={{ paddingHorizontal: 10 }}
                  transparent={true}
                  onPress={this.navigateTo('addToBoard', { boardId: board.id })}
                >
                  <MyIcon name="add" size={24} color="#fff" />
                </Button>
                <Button
                  style={{ paddingHorizontal: 10 }}
                  transparent={true}
                  onPress={this.onDeletePress}
                >
                  <MyIcon name="delete" size={24} color="#fff" />
                </Button>
              </View>
            )}
          </Left>
          <Body>
            <Text style={{ color: '#fff', fontSize: 18 }}>{board.name}</Text>
          </Body>
          <Right>
            <Button onPress={this.goBack} transparent={true}>
              <MyIcon name="back" size={24} color="#fff" />
            </Button>
          </Right>
        </Header>
        <View style={{ alignItems: 'center', flex: 1 }}>
          <DeleteModal
            visible={this.state.visible}
            onNoPress={this.onNoDeletePress}
            onYesPress={this.onYesDeletePress}
            onRequestClose={this.closeModal}
          />
          <Paginator
            defaultComponent={this.defaultComponent}
            name={`${board.id}_board_posts`}
            type="posts"
            url={`/social/boards/${board.id}/`}
            renderItem={this.renderItem}
            numColumns={2}
          />
        </View>
      </Container>
    );
  }
  private goBack = () => this.props.navigation.goBack();
  private navigateToPost = postId => () => NavigationService.navigateToPost(postId);
  private navigateTo = (name, param?) => () => this.props.navigation.navigate(name, param);
  private defaultComponent = () => {
    return <View />;
  };
  private renderItem = ({ item, index }) => {
    const post = this.props.getPostFromId(item);
    return (
      <ImageItem
        imagesPerRow={2}
        imageExtractor={this.imageExtractor}
        index={index}
        onPress={this.navigateToPost(post.id)}
        item={post}
      />
    );
  };
  private imageExtractor = post => ({ uri: post.image });
  private openModal = () => this.setState({ visible: true });
  private closeModal = () => this.setState({ visible: false });
  private onDeletePress = () => this.openModal();
  private onYesDeletePress = () => {
    const boardId = this.props.navigation.getParam('boardId');
    this.props.deleteBoard(boardId).then(() => {
      this.closeModal();
      this.navigateTo('profile');
      Toast.show({ text: I18n.t('boardDeletedSuccessfully') });
    });
  };
  private onNoDeletePress = () => this.closeModal();
}

const mapStateToProps = (state, ownProps: OwnProps): StateProps => {
  const boardId = ownProps.navigation.getParam('boardId');
  return {
    board: selectors.boards.getData(state, boardId),
    getPostFromId: postId => selectors.posts.getData(state, postId)
  };
};
const mapDispatchToProps = (dispatch, ownProps: OwnProps): DispatchProps => {
  const actions = getActionsFor('boards');
  const endPoint = actions.createEndpoint(`/social/boards/`);

  return {
    deleteBoard: id => dispatch(endPoint.deleteItem(`${id}/`))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardScreen);
