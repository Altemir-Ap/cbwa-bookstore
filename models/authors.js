const db = require('../db.js')();
const COLLECTION = 'authors';
module.exports = () => {
  const get = async () => {
    console.log('inside authors model');
    const authors = await db.get(COLLECTION);
    return authors;
  };
  const add = async (name) => {
    const authorCount = await db.count(COLLECTION);
    const results = await db.add(COLLECTION, {
      id: authorCount + 1,
      name: name,
    });
    return results.result;
  };
  return {
    get,
    add,
  };
};
