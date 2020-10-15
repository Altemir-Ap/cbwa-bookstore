const db = require('../db.js')();
module.exports = () => {
  const get = (id = null) => {
    console.log(' inside authors model');
    if(!id){
      return db.authors;
    }
    return db.authors[parseInt(id) -1];
  };
  const add = (name) => {
    return db.authors.push({
      id: db.authors.length + 1,
      name,
    });
  };
  return {
    get,
    add,
  };
};
