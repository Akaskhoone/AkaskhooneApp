export interface ProfileDTO {
  username: string;
  name: string;
  bio?: string;
  image: string;
  followings?: number;
  followers?: number;
  is_followed?: boolean;
  is_private?: boolean;
  posts_count?: number;
  boards_count?: number;
}

export interface PostDTO {
  id: string;
  image: string;
  des?: string;
  tags?: [string]; // TagDTO
  creator?: string; // ProfileDTO
  location?: string;
  date?: string;
  likes_count?: number;
  comments_count?: number;
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
  data: [string]; // PostDTO
}

export interface TagDTO {
  name: string;
}

export interface PaginationableDTO<T> {
  data: [T];
  next: string;
  previous?: string;
}
