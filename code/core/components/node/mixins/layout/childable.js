var Nodes   = require('core/stores/nodes.js'),
    Factory = require('core/ui/layout/factory.js');

module.exports = {
    getChildren: function(children) {
        this.children = Factory.createChildNodes(this.state.children) || [];
        return this.children;
    },
}