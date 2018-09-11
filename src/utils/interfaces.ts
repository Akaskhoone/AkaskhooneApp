interface User {
  username: string;
  name: string;
  profileImage: string;
  bio: string;
  private: boolean;
  followStatus: 'followed' | 'notfollowed' | 'requested';
}
interface Post {
  post_id: string;
  creator: {
    username: string;
    name: string;
    image: string;
  };
  image: string;
}
interface Board {
  board_id: string;
  name: string;
  count: number;
  posts: Array<{ post_id: string; image: string }>;
}
interface Props {
  bookmark: Board;
}
