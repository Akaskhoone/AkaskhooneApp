import { ASSETS_URL } from '@utils/env.json';
import deepmerge from 'deepmerge';
import { schema } from 'normalizr';
import { BoardDTO, CommentDTO, PostDTO, ProfileDTO, TagDTO } from 'src/utils/interfaces';

const initialize = initialState => value => {
  const newValue = addImageUrl(value);
  return deepmerge(initialState, newValue);
};

const addImageUrl = value => {
  if (!value.image) return { ...value };
  return {
    ...value,
    image: `${ASSETS_URL}/${value.image}`
  };
};

const profileInitialState: ProfileDTO = {
  bio: '',
  boards_count: 0,
  followers: 0,
  followings: 0,
  image: '',
  is_followed: true,
  is_private: true,
  name: '',
  posts_count: 0,
  username: ''
};

export const profile = new schema.Entity(
  'profiles',
  {},
  { idAttribute: 'username', processStrategy: initialize(profileInitialState) }
);

const tagInitialState: TagDTO = {
  name: ''
};
export const tag = new schema.Entity(
  'tags',
  {},
  { idAttribute: 'name', processStrategy: initialize(tagInitialState) }
);

const postInitialState: PostDTO = {
  comments_count: 0,
  creator: '',
  date: '',
  des: '',
  id: '',
  image: '',
  likes_count: 0,
  location: '',
  tags: []
};
export const post = new schema.Entity(
  'posts',
  { creator: profile, tags: [tag] },
  { processStrategy: initialize(postInitialState) }
);

const boardInitialState: BoardDTO = {
  id: '',
  name: '',
  posts: [],
  posts_count: 0
};
export const board = new schema.Entity(
  'boards',
  { posts: [post] },
  { processStrategy: initialize(boardInitialState) }
);

const commentInitialState: CommentDTO = {
  creator: '',
  date: '',
  id: '',
  post_id: '',
  text: ''
};
export const comment = new schema.Entity('comments', { creator: profile }, { idAttribute: 'id' });
export const notification = new schema.Entity('notifications', {
  post,
  creator: profile
});
