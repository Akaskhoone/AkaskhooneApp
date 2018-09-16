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
const AddToBoardModal = ({ visible, onRequestClose, getBookmark }: Props) => {
  const renderDefaultComponent = () => <View />;
  const renderItem = ({ item: bookmarkId }) => {
    const bookmark = getBookmark(bookmarkId);
    return (
      <TouchableNativeFeedback>
        <View style={styles.itemContainer}>
          <Text>{bookmark.name}</Text>
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
          <View style={styles.itemContainer}>
            <Text style={{ fontSize: 10 }}>{I18n.t('addToBoard')}</Text>
            <Text note={true}>{I18n.t('chooseOneBoard')}</Text>
          </View>
          <TouchableNativeFeedback>
            <View
              style={[
                { flexDirection: 'row', backgroundColor: '#ccc', justifyContent: 'flex-end' }
              ]}>
              <Text style={{}}>{I18n.t('createNewBoard')}</Text>
              <MyIcon name="add" />
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
    justifyContent: 'center',
    alignItems: 'flex-end',
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
  getBookmark: boardId => selectors.boards.getData(state, boardId)
});
const mapDispatchToProps = (dispatch, ownProps: OwnProps): DispatchProps => ({});
export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(AddToBoardModal);
