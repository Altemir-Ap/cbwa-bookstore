const authors = require('../models/authors.js')();

module.exports = () => {
  const getController = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.json(authors.get());
  };
  const postController = (req, res) => {
    let author = req.body.name;
    authors.add(author);
    return res.end(`POST: ${author}`);
  };

  const getById = (req, res) =>{
    res.setHeader('Content-Type', 'application/json');
    res.json(authors.get(req.params.id));
  }
  return {
    getController,
    postController,
    getById
  };
};
