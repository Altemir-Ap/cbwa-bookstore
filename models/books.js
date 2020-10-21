const books = require('../controllers/books');

const db = require('../db')();
const COLLECTION = 'books';
const LOOKUP_AUTHORS_PIPELINE = [
  {
    $lookup: {
      from: 'authors',
      localField: 'author',
      foreignField: 'id',
      as: 'books_author',
    },
  },
  {
    $project: {
      id: 1,
      name: 1,
      author: {
        $arrayElemAt: ['$books_author', 0],
      },
    },
  },
];
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

  const aggregateWithAuthors = async () => {
    const books = await db.aggregate(COLLECTION, LOOKUP_AUTHORS_PIPELINE);
    return books;
  };

  return {
    get,
    add,
    aggregateWithAuthors,
  };
};
