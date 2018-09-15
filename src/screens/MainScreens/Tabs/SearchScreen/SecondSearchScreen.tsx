import ProfileListItem from '@components/ProfileListItem';
import { Container, Header, Input, Item, Tab, Tabs, View } from 'native-base';
import React, { Component } from 'react';
import connect from 'react-redux';
import { getActionsFor } from 'src/libs/Paginator';
import Paginator from 'src/libs/Paginator/Paginator';
import I18n from 'src/utils/i18n';

interface Props {
  [propName: string]: any;
}
interface State {
  searchQuary: string;
  value: string;
}
export default class SecondeSearchScreen extends Component<Props, State> {
  public state = {
    value: '',
    searchQuary: ''
  };
  public render() {
    return (
      <Container>
        <Header searchBar={true} rounded={true}>
          <Item>
            <Input autoFocus={true} value={this.state.value} onChangeText={this.onChange} />
          </Item>
        </Header>
        <View style={{ flex: 1, marginTop: 5, backgroundColor: '#000' }}>
          <Tabs locked={true}>
            <Tab heading={I18n.t('users')}>
              <Paginator
                name={`searchedUsers${this.state.searchQuary}`}
                url={`/accounts/profile/?search=${this.state.value}`}
                type="profiles"
                defaultComponent={this.defaultComp}
                renderItem={this.renderProfile}
                extraData={this.state}
              />
            </Tab>
            <Tab heading={I18n.t('hashtag')}>
              {/* <Paginator
                name="searchHashtag"
                url={`/social/tags/?search=${this.state.value}`}
                type='tags'
                defaultComponent={this.defaultComp}
                {renderItem}
              /> */}
            </Tab>
          </Tabs>
        </View>
      </Container>
    );
  }
  private onChange = text => {
    this.setState({ value: text }, () => this.forceUpdate());
    this.changeSearchQuary(text);
  };
  private changeSearchQuary = text => this.setState({ searchQuary: text });

  private renderProfile = ({ item: username }) => <ProfileListItem username={username} />;
  private defaultComp = () => {
    return <View />;
  };
}
