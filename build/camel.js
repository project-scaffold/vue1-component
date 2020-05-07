module.exports = function _camel(name) {
  const r = name.replace(/[\-\_]\w/g, $0 => $0[1].toUpperCase())
  return r[0].toUpperCase() + r.substring(1)
}
