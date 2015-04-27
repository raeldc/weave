var Nodes   = require('core/stores/nodes.js'),
    Factory = require('core/ui/layout/factory.js');

module.exports = {
    getInitialState: function() {
        return Nodes.get(this.props.id);
    },

    componentWillMount: function() {
        this.prepareChildren();
    },

    componentWillUpdate: function(nextProps, nextState) {
        //TODO: Don't prepare children if nothing changed.
        this.prepareChildren(nextProps, nextState);
    },

    prepareChildren: function(nextProps, nextState) {
        var nextProps = nextProps || this.props;
        var nextState = nextState || this.state;

        this.children = Factory.createChildNodes(nextState.children) || [];

        return this.children;
    },
}