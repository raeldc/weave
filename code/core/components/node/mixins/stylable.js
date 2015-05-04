Layout = require('core/stores/layout.js'),

module.exports = {
    setStyles: function(properties) {
        var style = this.state.css;
        
        properties.style = _.extend(_.clone(style.all), style[Layout.get('device')]);

        return properties;
    }
};