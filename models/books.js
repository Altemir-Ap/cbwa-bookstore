const db = require('../db.js')();
const COLLECTION = 'books';
module.exports = () => {
  const get = async (id = null) => {
    console.log(' inside books model');
    if (!id) {
      const books = await db.get(COLLECTION);
      return books;
    }
    return { error: 'byId not implemented yet' };
  };
  const add = async (name, author) => {
    const booksCounter = await db.count(COLLECTION);
    const results = await db.add(COLLECTION, {
      id: booksCounter + 1,
      name: name,
      author: author,
    });

    return results.result;
  };
  return {
    get,
    add,
  };
};
