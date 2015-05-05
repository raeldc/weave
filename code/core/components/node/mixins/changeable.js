var Nodes = require('core/stores/nodes.js');

module.exports = {
    componentDidMount: function() {
        this.stopListeningToNodeChanges = Nodes.getStore(this.props.id).listen(this.renderChanges);
    },

    componentWillUnmount: function() { 
        this.stopListeningToNodeChanges();
    },

    renderChanges: function(id) {
        this.setState(Nodes.get(this.props.id));
    }
}