const faker = require('faker/locale/fa');
let data = { posts: [] };
for (let i = 0; i < 1000; i++) {
  data.posts.push({
    id: faker.random.uuid(),
    title: faker.name.title(),
    description: faker.hacker.phrase(),
    profileImage: faker.image.imageUrl()
  });
}
module.exports = data;
