const net = require('net');
const { GopherRequest, GopherResponse } = require('gopher-protocol');

class Gopher {

  constructor() {
    this.server = net.createServer(this._setupServer.bind(this));
    this.routes = {};
  }

  addRoute(route, handler) {
    this.routes[route] = async (ctx) => { 
      return handler(ctx);
    };
  }

  _setupServer(socket) {
    socket.on('data', buffer => {
      const selector = buffer.toString().trim();

      const gopherRequest = new GopherRequest(selector);
      const context = {
        request: gopherRequest,
        socket: socket
      };

      this._handleRequest(context).then(() => {
        socket.end();
      });
    });
  }

  async _handleRequest(context) {
    const route = context.request.location;
    if (!this.routes[route]) {
      throw new Error('Not Found');
    }
    const response = await this.routes[route](context);
    context.socket.write(response);
  }

  listen(port = 80, ip = '127.0.0.1') {
    this.server.listen(port, ip);
  }
}

module.exports = Gopher;
