const express = require('express');
const bodyParser = require('body-parser');

const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;
const authorController = require('./controllers/authors')();
const booksController = require('./controllers/books')();
const app = (module.exports = express());

app.use('/', express.static('static'));

app.use((req, res, next) => {
  console.log('[%s] %s -- %s', new Date(), req.method, req.url);
  next();
});

app.use(bodyParser.json());

app.get('/books', booksController.getController);
app.get('/books/populated', booksController.populatedController);
app.post('/books', booksController.postController);
app.get('/books/:id', booksController.getById);

app.get('/authors', authorController.getController);
app.get('/authors/populated', authorController.populatedController);
app.post('/authors', authorController.postController);
app.get('/authors/:id', authorController.getById);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

app.use((req, res) => {
  res.status(404).json({
    error: 404,
    message: 'Route not found',
  });
});
