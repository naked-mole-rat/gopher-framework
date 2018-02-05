const GopherLink = require('./link');

const toBufferFromLinks = (links) => {
  const buffer = links
    .map(link => link.generate())
    .join('\n');

  return buffer;
};

const toLinksFromBuffer = (buffer) => {
  const lines = buffer.split('\r\n');
  return lines.map((line) => {
    const lineParts = line.split('\t');
    return new GopherLink(
      lineParts[0].substring(0, 1),
      lineParts[0].substring(1),
      ...lineParts.slice(1),
    );
  });
};

module.exports = {
  toBufferFromLinks,
  toLinksFromBuffer,
};
