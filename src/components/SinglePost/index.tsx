import { Spinner, Text, Toast } from 'native-base';
import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import Reactotron from 'reactotron-react-native';
import PostCard from 'src/components/PostCard';
import Paginator from 'src/libs/Paginator';
import Comment from './CommentCard';
import CommentTextInput from './CommentTextInput';

interface OwnProps {
  postId: any;
}
interface StateProps {
  comments: [any];
  loading: boolean;
  hasNext: boolean;
}
interface DispatchProps {
  load: any;
  reset: any;
}
type Props = OwnProps & StateProps & DispatchProps;
export class SinglePost extends Component<Props> {
  public render() {
    const { postId } = this.props;
    return (
      <View style={{ height: '100%' }}>
        <Paginator
          defaultComponent={this.renderDefaultComponent}
          name={`${postId}_comments`}
          type="comments"
          url={`/social/posts/${postId}/comments`}
          ListHeaderComponent={this.renderHeader}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
  private renderDefaultComponent = () => {
    return <View />;
  };
  private renderHeader = () => {
    return <PostCard postId={this.props.postId} />;
  };
  private renderItem = ({ item }) => {
    return <Comment data={item} />;
  };
}

const mapStateToProps = (state, props: OwnProps): StateProps => ({
  loading: false,
  comments: ['hi'],
  hasNext: false
});
const mapDispatchToProps = (dispatch): DispatchProps => ({
  load: () => {
    // return dispatch(loadAction(id)).catch(e => {
    //   Toast.show({ text: I18n.t('unknownError') });
    // }),
  },
  reset: id => {
    // return dispatch(resetAction(id))
  }
});

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(SinglePost);
