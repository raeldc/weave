var utilities = {}

if(typeof jQuery !== 'object') {
    var jQuery = require('jquery')
}

if(typeof _ !== 'object') {
    var _ = require('underscore-node')
}

_.extend(utilities, {
    _     : _,
    jQuery: jQuery
})

if(typeof global === 'object') {
    _.extend(global, utilities)
}
else {
    _.extend(window, utilities)
}

module.exports = utilities