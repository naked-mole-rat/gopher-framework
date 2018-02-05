module.exports = class GopherLink {
  constructor(type, displayText, selector, host, port) {
    this.type = type;
    this.displayText = displayText;
    this.selector = selector;
    this.host = host;
    this.port = port;
  }

  generate() {
    return `${this.type}${this.displayText}\t${this.selector}\t${this.host}\t${this.port}`;
  }
};
