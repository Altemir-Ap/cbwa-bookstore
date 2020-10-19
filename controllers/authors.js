const authors = require('../models/authors.js')();

module.exports = () => {
  const getController = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.json(await authors.get());
  };
  const postController = async (req, res) => {
    let author = req.body.name;
    const result = await authors.add(author);
    return res.json(result);
  };

  const getById = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json({ error: 'byId not implemented yet' });
  };
  return {
    getController,
    postController,
    getById,
  };
};
