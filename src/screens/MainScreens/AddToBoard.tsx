import AddToBoardComponent from '@components/AddToBoardComponent';
import MyIcon from '@elements/Icon';
import { BoardDTO, PostDTO } from '@utils/interfaces';
import { Body, Button, Container, Header, Left, Right, Text, View } from 'native-base';
import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { selectors } from 'src/reducers';
import I18n from 'src/utils/i18n';

interface OwnProps {
  navigation: NavigationScreenProp<any, any>;
}
interface StateProps {
  board: BoardDTO;
}
interface DispatchProps {}
type Props = OwnProps & StateProps & DispatchProps;

class AddToBoard extends Component<Props> {
  public render() {
    const { board } = this.props;
    return (
      <Container style={{ flex: 1 }}>
        <Header>
          <Left>
            <Button transparent={true} />
          </Left>
          <Body>
            <Text style={{ color: '#fff', fontSize: 12 }}>{I18n.t('yourSharedImages')}</Text>
          </Body>
          <Right>
            <Button onPress={this.goBack} transparent={true}>
              <MyIcon name="clear" size={24} color="#fff" />
            </Button>
          </Right>
        </Header>
        <View style={{ alignItems: 'center', flex: 1 }}>
          <AddToBoardComponent boardId={board.id} />
        </View>
      </Container>
    );
  }
  private goBack = () => this.props.navigation.goBack();
}

const mapStateToProps = (state, ownProps: OwnProps): StateProps => {
  const boardId = ownProps.navigation.getParam('boardId');
  return {
    board: selectors.boards.getData(state, boardId)
  };
};
export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps)(AddToBoard);
