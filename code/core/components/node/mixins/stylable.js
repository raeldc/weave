var Nodes       = require('core/stores/nodes.js'),
    LayoutStore = require('core/stores/layout.js');

module.exports = {
    getInitialState: function() {
        if(this.properties === undefined) {
            this.properties = {};
        }
    },

    setStyles: function() {
        this.properties.style = _.deepExtend(_.deepClone(this.state.css.all), this.state.css[this.props.device]);
    }
};