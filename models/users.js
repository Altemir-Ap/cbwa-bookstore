const db = require('../db')();

const COLLECTION = 'users';

module.exports = () => {
  const getByKey = async (key) => {
    if (!key) {
      console.log(' 01: Missing key');
      return null;
    }
    const users = await db.get(COLLECTION, { key });
    if (users.length !== 1) {
      console.log(' 02: Bad key');
      return null;
    }

    return users[0];
  };

  return {
    getByKey,
  };
};
