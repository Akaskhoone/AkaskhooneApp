import MyIcon from '@elements/Icon';
import { BoardDTO } from '@utils/interfaces';
import { Text } from 'native-base';
import React, { Component } from 'react';
import { Modal, StyleSheet, TouchableNativeFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import { getActionsFor } from 'src/libs/Paginator';
import Paginator from 'src/libs/Paginator/Paginator';
import { selectors } from 'src/reducers';
import I18n from 'src/utils/i18n';

interface OwnProps {
  visible: boolean;
  postId: string;
  onRequestClose: any;
}
interface StateProps {
  getBoard: (string) => BoardDTO;
}
interface DispatchProps {
  addToBoard: (boardId: string) => any;
  createBoard: (boardName: string) => any;
}
type Props = OwnProps & StateProps & DispatchProps;
const AddToBoardModal = ({ visible, onRequestClose, getBoard, addToBoard }: Props) => {
  const renderDefaultComponent = () => <View />;
  const handleSubmit = boardId => () => {
    addToBoard(boardId).then(() => {
      onRequestClose();
    });
  };
  const renderItem = ({ item: boardId }) => {
    const board = getBoard(boardId);
    return (
      <TouchableNativeFeedback onPress={handleSubmit(boardId)}>
        <View style={styles.itemContainer}>
          <Text>{board.name}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  };
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onRequestClose}>
      <View style={styles.modalBg}>
        <View style={styles.container}>
          <View
            style={[
              styles.itemContainer,
              {
                justifyContent: 'center',
                alignItems: 'center'
              }
            ]}>
            <Text style={{ fontSize: 10 }}>{I18n.t('addToBoard')}</Text>
            <Text note={true}>{I18n.t('chooseOneBoard')}</Text>
          </View>
          <TouchableNativeFeedback>
            <View
              style={[
                styles.itemContainer,
                {
                  flexDirection: 'row',
                  backgroundColor: '#ccc',
                  justifyContent: 'flex-end',
                  alignItems: 'center'
                }
              ]}>
              <Text style={{ textAlignVertical: 'center' }}>{I18n.t('createNewBoard')}</Text>
              <MyIcon style={{ paddingHorizontal: 10 }} name="add" />
            </View>
          </TouchableNativeFeedback>
          <Paginator
            name="addToBoardMenu"
            url="/social/boards/?limit=10"
            type="boards"
            defaultComponent={renderDefaultComponent}
            renderItem={renderItem}
            style={{ flexGrow: 1 }}
          />
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalBg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  container: {
    width: '100%',
    height: '80%',
    borderRadius: 5,
    backgroundColor: '#fff'
  },
  itemContainer: {
    paddingVertical: 15,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderColor: '#EFEFEF'
  },
  buttonText: {},
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: '#EFEFEF'
  }
});

const mapStateToProps = (state, ownProps: OwnProps): StateProps => ({
  getBoard: boardId => selectors.boards.getData(state, boardId)
});
const mapDispatchToProps = (dispatch, ownProps: OwnProps): DispatchProps => {
  const boardActions = getActionsFor('boards');
  const boardEndpoint = boardActions.createEndpoint('/social/boards/');
  return {
    addToBoard: boardId =>
      dispatch(
        boardEndpoint.updateItem(`${boardId}/`, {
          add_posts: [ownProps.postId]
        })
      ),
    createBoard: boardName => dispatch(boardEndpoint.createItem({ name: boardName }))
  };
};
export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(AddToBoardModal);
