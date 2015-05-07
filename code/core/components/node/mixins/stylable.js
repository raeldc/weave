Layout = require('core/stores/layout.js'),

module.exports = {
    setStyles: function() {
        var style      = this.state.css;
        var properties = this.properties || {};

        properties.style = _.extend(_.clone(style.all), style[Layout.get('device')]);

        return properties;
    }
};