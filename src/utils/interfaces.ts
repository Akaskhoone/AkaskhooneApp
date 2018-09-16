export interface ProfileDTO {
  username: string;
  name: string;
  bio: string;
  image: string;
  followings: number;
  followers: number;
  is_followed: boolean;
  is_private: boolean;
  posts_count: number;
  boards_count: number;
}

export interface PostDTO {
  id: string;
  image: string;
  des: string;
  tags: string[]; // TagDTO
  creator: string; // ProfileDTO
  location: string;
  date: string;
  likes_count: number;
  comments_count: number;
  is_liked: boolean;
}

export interface CommentDTO {
  id: string;
  post_id: string;
  text: string;
  date: string;
  creator: string; // ProfileDTO
}

export interface BoardDTO {
  id: string;
  name: string;
  posts_count: number;
  posts: string[]; // PostDTO
}

export interface TagDTO {
  name: string;
}

export enum NotificationTypes {
  'like' = 'like',
  'dislike' = 'dislike',
  'follow' = 'follow',
  'unfollow' = 'unfollow',
  'join' = 'join'
}
export type NotificationDTO = { id: string; date: string } & (
  | {
      type: NotificationTypes.like | NotificationTypes.dislike;
      creator: string; // ProfileDTO
      post: string; // PostDTO
    }
  | {
      type: NotificationTypes.follow | NotificationTypes.unfollow | NotificationTypes.join;
      creator: string; // ProfileDTO
    });

export interface PaginationableDTO<T> {
  data: [T];
  next: string;
  previous?: string;
}
