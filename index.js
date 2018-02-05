const Gopher = require('./src/gopher');

const gopher = new Gopher();

gopher.addRoute(
  '',
  async ctx => {
    return ;
  }
);

gopher.addRoute(
  'darkest-secrets',
  async ctx => {
    return 'i love cheese';
  }
);

gopher.listen(3000);