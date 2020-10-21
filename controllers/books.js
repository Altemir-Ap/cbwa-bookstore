const books = require('../models/books.js')();

module.exports = () => {
  const getController = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );
    return res.json(await books.get());
  };
  const postController = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );
    const name = req.body.name;
    const author = req.body.author;
    const result = await books.add(name, author);
    return res.json(result);
  };

  const getById = async (req, res) => {
    res.setHeader('content-type', 'application/json');
    res.json(await books.get(parseInt(req.params.id)));
  };

  const populatedController = async (req, res) => {
    res.json(await books.aggregateWithAuthors());
  };

  return {
    getController,
    postController,
    getById,
    populatedController,
  };
};
