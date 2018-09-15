import MyIcon from '@elements/Icon';
import { BoardDTO } from '@utils/interfaces';
import { Text } from 'native-base';
import React, { Component } from 'react';
import { Modal, StyleSheet, TouchableNativeFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import Paginator from 'src/libs/Paginator/Paginator';
import { selectors } from 'src/reducers';
import I18n from 'src/utils/i18n';

interface OwnProps {
  visible: boolean;
  postId: string;
  onRequestClose: any;
}
interface StateProps {
  getBookmark: (string) => BoardDTO;
}
interface DispatchProps {}
type Props = OwnProps & StateProps & DispatchProps;
const AddToBoardModal = ({ visible, postId, onRequestClose, getBookmark }: Props) => {
  const renderDefaultComponent = () => <View />;
  const renderItem = ({ item: bookmarkId }) => {
    const bookmark = getBookmark(bookmarkId);
    return (
      <View style={{ width: '100%', borderBottomWidth: 1 }}>
        <Text>{bookmark.name}</Text>
      </View>
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
          <View style={styles.desContainer}>
            <Text style={{ fontSize: 10 }}>{I18n.t('addToBoard')}</Text>
            <Text note={true}>{I18n.t('chooseOneBoard')}</Text>
          </View>
          <TouchableNativeFeedback>
            <View style={[styles.buttonContainer, { flexDirection: 'row' }]}>
              <Text>{I18n.t('createNewBoard')}</Text>
              <MyIcon name="add" />
            </View>
          </TouchableNativeFeedback>
          <Paginator
            name="addToBoardMenu"
            url="/social/board/"
            type="bookmarks"
            defaultComponent={this.renderDefaultComponent}
            renderItem={this.renderItem}
          />
          <TouchableNativeFeedback>
            <View style={[styles.buttonContainer]}>
              <Text>{I18n.t('no')}</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback>
            <View style={styles.buttonContainer}>
              <Text>{I18n.t('delete')}</Text>
            </View>
          </TouchableNativeFeedback>
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
    height: 110,
    borderRadius: 5,
    backgroundColor: '#fff'
  },
  desContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  desText: {},
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#EFEFEF'
  },
  buttonText: {}
});

const mapStateToProps = (state, ownProps: OwnProps): StateProps => ({
  getBookmark: boardId => selectors.boards.getData(state, boardId)
});
const mapDispatchToProps = (dispatch, ownProps: OwnProps): DispatchProps => ({});
export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(AddToBoardModal);
