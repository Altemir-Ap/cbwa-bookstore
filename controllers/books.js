const books = require('../models/books.js')();

module.exports = () => {
  const getController = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );
    return res.json(books.get());
  };
  const postController = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );
    const name = req.body.name;
    const author = req.body.author;
    books.add(name, author);
    return res.end(`POST: ${name}, ${author}`);
  };

  const getById = (req, res)=>{
    res.setHeader('content-type', 'application/json');
    res.json(books.get(req.params.id));
  }


  return {
    getController,
    postController,
    getById
  };
};
