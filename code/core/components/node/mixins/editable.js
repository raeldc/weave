var Nodes         = require('core/stores/nodes.js'),
    LayoutActions = require('core/actions/layout.js');

module.exports = {
    setEditable: function(properties) {
        if(this.isText()) {
            var text = this.state.text.length ? this.state.text: '&nbsp;';
            properties.dangerouslySetInnerHTML = {__html: text};
        }

        return properties;
    },

    isText: function() {
        return _.isEmpty(this.state.children) && _.isString(this.state.text);
    }
}