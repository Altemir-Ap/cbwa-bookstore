const authors = require('../models/authors.js')();

module.exports = () => {
  const getController = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );
    return res.json(await authors.get());
  };
  const postController = async (req, res) => {
    let author = req.body.name;
    const result = await authors.add(author);
    return res.json(result);
  };

  const getById = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(await authors.get(parseInt(req.params.id)));
  };

  const populatedController = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );

    res.json(await authors.aggregateWithBooks());
  };
  return {
    getController,
    postController,
    getById,
    populatedController,
  };
};
