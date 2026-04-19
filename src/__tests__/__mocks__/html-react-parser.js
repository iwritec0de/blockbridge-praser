// Test mock: html-react-parser is ESM-only (domhandler has no CJS build).
const parse = jest.fn((html) => html);
module.exports = parse;
module.exports.default = parse;
