import { changeInfoSubmitted } from '@actions/changeInfoActions';
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
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import Reactotron from 'reactotron-react-native';
import { SubmissionError } from 'redux-form';
import { getActionsFor } from 'src/libs/Paginator';
import { selectors } from 'src/reducers';
import { extractErrors } from 'src/utils/helpers';
import { ProfileDTO } from 'src/utils/interfaces';

interface OwnProps {
  navigation: NavigationScreenProp<any, any>;
}
interface StateProps {
  profile: ProfileDTO;
  email: string;
}
interface DispatchProps {
  loadProfile: any;
  changeInfo: any;
}
type Props = OwnProps & StateProps & DispatchProps;

class ChangeInfoScreen extends Component<Props> {
  public componentDidMount() {
    this.props.loadProfile();
  }

  public render() {
    const { profile } = this.props;
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
              image: { uri: profile.image, new: true },
              username: profile.username,
              email: this.props.email,
              name: profile.name,
              bio: profile.bio
            }}
            onSubmit={this.changeInfoSubmitHandler}
          />
        </Content>
      </Container>
    );
  }
  private goBack = () => this.props.navigation.goBack();
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

const mapDispatchToProps = (dispatch): DispatchProps => ({
  changeInfo: vals => dispatch(changeInfoSubmitted(vals.name, vals.bio, vals.image)),
  loadProfile: () =>
    dispatch(
      getActionsFor('profiles')
        .createEndpoint('/accounts/profile/')
        .loadItem('')
    )
});

const mapStateToProps = (state): StateProps => {
  const ownUsername = selectors.getOwner(state).username;
  return {
    profile: selectors.profiles.getData(state, ownUsername),
    email: selectors.getOwner(state).email
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(ChangeInfoScreen);
