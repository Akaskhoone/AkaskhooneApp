export interface ProfileDTO {
  username: string;
  name: string;
  bio?: string;
  image: string;
  followings?: number;
  followers?: number;
  private?: boolean;
  isFollowed?: boolean;
}

export interface PostDTO {
  postId: string;
  des?: string;
  tags?: [TagDTO];
  creator?: ProfileDTO;
  image: string;
  likesCount?: number;
  commentsCount?: number;
}

export interface CommentDTO {
  commentId: string;
  postId: string;
  text: string;
  creator: ProfileDTO;
}

export interface BoardDTO {
  boardId: string;
  name: string;
  postsCount: number;
  posts?: [PostDTO];
}

export interface TagDTO {
  name: string;
}

export interface PaginationableDTO<T> {
  data: [T];
  next: string;
  previous?: string;
}
