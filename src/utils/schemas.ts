import { ASSETS_URL } from '@utils/env.json';
import { schema } from 'normalizr';

const addUrlToImage = (value, parent, key) => {
  if (!value.image) return { ...value };
  return {
    ...value,
    image: `${ASSETS_URL}/${value.image}`
  };
};

export const profile = new schema.Entity(
  'profiles',
  {},
  { idAttribute: 'username', processStrategy: addUrlToImage }
);

export const tag = new schema.Entity('tags', {}, { idAttribute: 'name' });
export const post = new schema.Entity(
  'posts',
  { creator: profile, tags: [tag] },
  { idAttribute: 'id', processStrategy: addUrlToImage }
);
export const board = new schema.Entity('boards', { data: [post] });
export const comment = new schema.Entity('comments', { creator: profile }, { idAttribute: 'id' });
export const notification = new schema.Entity('notifications', {
  post,
  creator: profile
});
