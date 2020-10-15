module.exports = () => {
  const authors = [
    { id: 1, name: 'William Gibson' },
    { id: 2, name: 'Neil Stephenson' },
  ];
  const books = [
    { id: 1, name: 'Snow Crash', author: 2 },
    { id: 2, name: 'Cryptonomicon', author: 2 },
    { id: 3, name: 'Neuromancer', author: 1 },
  ];
  return {
    books,
    authors,
  };
};
