import { schema } from 'normalizr';

export const profile = new schema.Entity('profiles', {}, { idAttribute: 'username' });
export const tag = new schema.Entity('tags', {}, { idAttribute: 'name' });
export const post = new schema.Entity(
  'posts',
  { creator: profile, tags: [tag] },
  { idAttribute: 'id' }
);
export const board = new schema.Entity('boards', { posts: post });
export const comment = new schema.Entity('comments', { creator: profile }, { idAttribute: 'id' });
