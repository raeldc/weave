var Nodes = require('application/stores/nodes.js');

module.exports = React.createClass({
    getInitialState: function() {
        return Nodes.get(this.props.node);
    },

    render: function() {
        return <div><h5>Box Style</h5></div>;
    }
});