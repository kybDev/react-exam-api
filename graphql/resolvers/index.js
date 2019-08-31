
const eventResolver= require('./events');
const bookResolver = require('./booking');
const authResolver = require('./auth');
const visitResolver = require('./visitor');


const rooResolver = {
  ...authResolver,
  ...bookResolver,
  ...eventResolver,
  ...visitResolver
}


module.exports = rooResolver;
