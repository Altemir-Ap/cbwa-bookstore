const db = require('../db')();
const COLLECTION = 'authors';
const LOOKUP_BOOKS_PIPELINE = [
  {
    $lookup: {
      from: 'books',
      localField: 'id',
      foreignField: 'author',
      as: 'books',
    },
  },
];
module.exports = () => {
  const get = async (id = null) => {
    console.log('inside authors model');
    if (!id) {
      const allAuthors = await db.get(COLLECTION);
      return allAuthors;
    }
    const singleAuthor = await db.get(COLLECTION, { id });
    return singleAuthor;
  };

  const add = async (name) => {
    const authorCount = await db.count(COLLECTION);
    const results = await db.add(COLLECTION, {
      id: authorCount + 1,
      name: name,
    });
    return results.result;
  };

  const aggregateWithBooks = async () => {
    const authors = await db.aggregate(COLLECTION, LOOKUP_BOOKS_PIPELINE);
    return authors;
  };

  return {
    get,
    add,
    aggregateWithBooks,
  };
};
