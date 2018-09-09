import { changeInfoCompleted } from '@actions/changeInfoActions';
import ChangeInfoForm from '@components/forms/ChangeInfoForm';
import I18n from '@utils/i18n';
import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Left,
  Right,
  Title,
  Toast
} from 'native-base';
import React, { Component } from 'react';
import { scale } from 'react-native-size-matters';
import { connect } from 'react-redux';
import Reactotron from 'reactotron-react-native';
import { SubmissionError } from 'redux-form';
import { extractErrors } from 'src/utils/helpers';

interface Props {
  navigation: any;
  changeInfo: Function;
  username: string;
  email: string;
  bio: string;
  name: string;
  [propName: string]: any;
}
class ChangeInfoScreen extends Component<Props> {
  public render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent={true} />
          </Left>
          <Body>
            <Title style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>
              {I18n.t('editProfile')}
            </Title>
          </Body>
          <Right>
            <Button transparent={true} onPress={this.goBack}>
              <Icon type="Feather" name="arrow-right" style={{ fontSize: 26 }} />
            </Button>
          </Right>
        </Header>
        <Content contentContainerStyle={{ marginHorizontal: scale(20) }}>
          <ChangeInfoForm
            initialValues={{
              image: { uri: this.props.image, new: true },
              username: this.props.username,
              email: this.props.email,
              name: this.props.name,
              bio: this.props.bio
            }}
            onSubmit={this.changeInfoSubmitHandler}
          />
        </Content>
      </Container>
    );
  }
  private goBack = () => this.props.navigation.goBack();
  private navigateTo = name => () => this.props.navigation.navigate(name);
  private changeInfoSubmitHandler = vals => {
    return this.props
      .changeInfo(vals)
      .then(() => {
        Toast.show({ text: I18n.t('changedSuccessfully', { name: I18n.t('profile') }) });
        this.goBack();
      })
      .catch(res => {
        const errors = extractErrors(res, ['name', 'image', 'RequestError']);
        throw new SubmissionError({
          name: errors.name,
          _error: errors.RequestError
        });
      });
  };
}

const mapDispatchToProps = dispatch => ({
  changeInfo: vals => dispatch(changeInfoCompleted(vals.name, vals.bio, vals.image))
});

const mapStateToProps = state => {
  return {
    username: state.profiles.own.username,
    name: state.profiles.own.name,
    email: state.profiles.own.email,
    image: state.profiles.own.image,
    bio: state.profiles.own.bio
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeInfoScreen);
