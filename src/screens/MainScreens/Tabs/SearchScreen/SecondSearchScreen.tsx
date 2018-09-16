import HashtagListItem from '@components/HashtagListItem';
import ProfileListItem from '@components/ProfileListItem';
import { Container, Header, Input, Item, Tab, Tabs, View } from 'native-base';
import React, { Component } from 'react';
import Paginator from 'src/libs/Paginator/Paginator';
import I18n from 'src/utils/i18n';
import { debounce } from 'typescript-debounce-decorator';

interface Props {
  [propName: string]: any;
}
interface State {
  shouldSearch: boolean;
  value: string;
}
export default class SecondSearchScreen extends Component<Props, State> {
  public state = {
    value: '',
    shouldSearch: false
  };
  public render() {
    return (
      <Container>
        <Header searchBar={true} rounded={true} hasTabs={true}>
          <Item>
            <Input autoFocus={true} value={this.state.value} onChangeText={this.onChange} />
          </Item>
        </Header>
        <View style={{ flex: 1 }}>
          <Tabs locked={true}>
            <Tab heading={I18n.t('users')}>
              <Paginator
                name={`${this.state.value}searchedUsers`}
                url={`/accounts/profile/?search=${this.state.value}&limit=10`}
                type="profiles"
                defaultComponent={this.defaultComponent}
                renderItem={this.renderProfile}
                extraData={this.state}
                dataIsReady={this.state.shouldSearch}
                onDataLoad={this.onLoad}
              />
            </Tab>
            <Tab heading={I18n.t('hashtag')}>
              <Paginator
                name="searchHashtag"
                url={`/social/tags/?search=${this.state.value}`}
                type="tags"
                defaultComponent={this.defaultComponent}
                renderItem={this.renderHashtag}
              />
            </Tab>
          </Tabs>
        </View>
      </Container>
    );
  }
  private onChange = text => {
    this.setState({ value: text }, () => this.shouldSearch());
  };

  @debounce(500, { leading: false })
  private shouldSearch = () => {
    if (this.state.value) this.setState({ shouldSearch: true });
  };
  private onLoad = () => this.setState({ shouldSearch: false });

  private renderProfile = ({ item: username }) => <ProfileListItem username={username} />;
  private defaultComponent = () => {
    return <View />;
  };
  private renderHashtag = ({ item: tagName }) => <HashtagListItem tagName={tagName} />;
}
