import { schema } from 'normalizr';

export const profile = new schema.Entity('users', {}, { idAttribute: 'username' });
export const tag = new schema.Entity('tags');
export const post = new schema.Entity(
  'posts',
  { creator: profile, tags: [tag] },
  { idAttribute: 'post_id' }
);
export const board = new schema.Entity('boards', { posts: post });
export const comment = new schema.Entity(
  'comments',
  { creator: profile },
  { idAttribute: 'comment_id' }
);
