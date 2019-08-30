
const eventResolver= require('./events');
const bookResolver = require('./booking');
const authResolver = require('./auth');


const rooResolver = {
  ...authResolver,
  ...bookResolver,
  ...eventResolver
}


module.exports = rooResolver;
