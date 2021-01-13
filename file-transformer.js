// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  process(src, filename) {
    const file = JSON.stringify(`<object src=${path.basename(filename)}/>`);
    return `module.exports = { default: ${file} }`;
  },
};
