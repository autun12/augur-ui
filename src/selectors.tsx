// NOTE -- no longer used, leaving temporarily for historical ref
const rawSelectors = require("src/selectors-raw").default;
module.exports = {};
Object.keys(rawSelectors).forEach(selectorKey =>
  Object.defineProperty(module.exports, selectorKey, {
    get: rawSelectors[selectorKey],
    enumerable: true
  })
);
