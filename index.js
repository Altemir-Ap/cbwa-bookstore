const express = require('express');
const bodyParser = require('body-parser');

const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;
const authorController = require('./controllers/authors')();
const booksController = require('./controllers/books')();

const users = require('./models/users')();
const app = (module.exports = express());

app.use('/', express.static('static'));

app.use((req, res, next) => {
  console.log('[%s] %s -- %s', new Date(), req.method, req.url);
  next();
});
app.use(async (req, res, next) => {
  const FailedAuthMessage = {
    error: 'Failed authentication',
    message: 'Go away',
    code: 'xxx',
  };

  const suppliedKey = req.headers['x-api-key'];
  const clientIp =
    req.headers['x-fowarded-for'] || req.connection.remoteAddress;
  if (!suppliedKey) {
    console.log(
      '[%s] FAILED AUTHENTICATION -- %s, No Key Supplied',
      new Date(),
      clientIp,
    );
    FailedAuthMessage.code = '01';
    return res.status(401).json(FailedAuthMessage);
  }

  const user = await users.getByKey(suppliedKey);

  if (!user) {
    console.log(
      '[%s] FAILED AUTHENTICATION -- %s, BAD Key Supplied',
      new Date(),
      clientIp,
    );

    FailedAuthMessage.code = '02';
    return res.status(401).json(FailedAuthMessage);
  }
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
