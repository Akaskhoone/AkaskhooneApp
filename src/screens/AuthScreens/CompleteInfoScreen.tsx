import { completeInfoCompleted } from '@actions/completeInfoActions';
import CompleteInfoForm from '@components/forms/CompleteInfoForm';
import { Container, Content, Text } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { scale } from 'react-native-size-matters';
import { connect } from 'react-redux';
import Reactotron from 'reactotron-react-native';
import { destroy, SubmissionError } from 'redux-form';
import { extractErrors } from 'src/utils/helpers';
/*baraye moshakhas karadne inke y seri prop bayad bashan va type bazi propha,
har prop inja nabashe ham mishe moqe render kardan pass dada b shart vojode propName : any
age kolan interface nabashe har propi mishe pass dad*/

interface Props {
  completeInfo: Function;
  navigation: any;
  email: string;
  destroySignup: Function;
}
export class CompleteInfoScreen extends Component<Props> {
  public render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.mainView} enableResetScrollToCoords={true}>
          <View style={styles.formView}>
            <CompleteInfoForm onSubmit={this.completeInfoSubmitHandler} email={this.props.email} />
          </View>
        </Content>
      </Container>
    );
  }
  private navigateTo = name => () => this.props.navigation.navigate(name);
  private completeInfoSubmitHandler = vals => {
    return this.props
      .completeInfo(vals)
      .then(() => {
        this.props.destroySignup();
        this.navigateTo('login')();
      })
      .catch(res => {
        const errors = extractErrors(res, ['username', 'name', 'image', 'RequestError']);
        throw new SubmissionError({
          username: errors.username,
          name: errors.name,
          image: errors.image,
          _error: errors.RequestError
        });
      });
  };
}

const styles = StyleSheet.create({
  mainView: {
    minHeight: '100%'
  },
  formView: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: scale(20)
  }
});

const mapDispatchToProps = dispatch => ({
  completeInfo: vals =>
    dispatch(
      completeInfoCompleted(
        vals.email,
        vals.password,
        vals.username,
        vals.name,
        vals.bio,
        vals.image
      )
    ),
  destroySignup: () => dispatch(destroy('signup'))
});

export default connect(
  null,
  mapDispatchToProps
)(CompleteInfoScreen);
