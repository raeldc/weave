var Nodes         = require('core/stores/nodes.js'),
    LayoutActions = require('core/actions/layout.js');

module.exports = {
    componentDidMount: function() {
        this.stopListeningToNodeChanges = Nodes.getStore(this.props.id).listen(this.renderChanges);
    },

    componentDidUpdate: function() { 
        this.stopListeningToNodeChanges();
        this.stopListeningToNodeChanges = Nodes.getStore(this.props.id).listen(this.renderChanges);
    },

    componentWillUnmount: function() { 
        this.stopListeningToNodeChanges();
    },

    renderChanges: function(id) {
        LayoutActions.nodeTouched(this.props.id);
        this.setState(Nodes.get(this.props.id));
    }
}