const books = require('../controllers/books');

const db = require('../db')();
const COLLECTION = 'books';
module.exports = () => {
  const get = async (id = null) => {
    console.log(' inside books model');
    if (!id) {
      const allBooks = await db.get(COLLECTION);
      return allBooks;
    }
    const singleBook = await db.get(COLLECTION, { id });
    return singleBook;
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
