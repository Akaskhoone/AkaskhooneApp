import { Card, CardItem } from 'native-base';
import React, { Component } from 'react';
import Reactotron from 'reactotron-react-native';
import Caption from './PostCaption';
import Footer from './PostFooter';
import Header from './PostHeader';
import Image from './PostImage';
interface Props {
  data: any;
  onImagePress: any;
  onProfilePress: any;
}
export class PostCard extends Component<Props> {
  public render() {
    const item = this.props.data;
    return (
      <Card>
        <CardItem>
          <Header
            location={item.location}
            creator={item.creator}
            date={item.date}
            profileUrl={item.profileUrl}
            showProfile={this.props.onProfilePress}
          />
        </CardItem>
        <CardItem cardBody={true}>
          <Image imageUrl={item.image} onPress={this.props.onImagePress} />
        </CardItem>
        <CardItem>
          <Caption
            description={item.des}
            tags={item.tags.reduce((p, t) => `${p} #${t}`, '').trim()}
          />
        </CardItem>
        <CardItem>
          <Footer likes={item.likes} comments={item.comments} liked={item.liked} />
        </CardItem>
      </Card>
    );
  }
}

export default PostCard;
