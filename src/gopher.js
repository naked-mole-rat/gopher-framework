const net = require('net');
const { GopherRequest, GopherResponse } = require('gopher-protocol');

class Gopher {

  constructor() {
    this.server = net.createServer(this._setupServer.bind(this));
  }

  _setupServer(socket) {
    socket.on('data', data => {
      this._handleData(socket, data);
    });
  }

  _handleData(socket, data) {
    const selector = data.toString().trim();
    const gopherRequest = new GopherRequest(selector);
    const context = {
      request: gopherRequest,
      socket: socket
    }
    this.requestCallback(context);
  }

  use(fn) {
    // this all you get for now
    this.requestCallback = fn;
  }

  listen(port = 80, ip = '127.0.0.1') {
    this.server.listen(port, ip);
  }
}

module.exports = Gopher;
