var Nodes = require('core/stores/nodes.js');

module.exports = React.createClass({
    getInitialState: function() {
        return Nodes.get(this.props.node);
    },

    render: function() {
        return <div><h5>Formatting</h5></div>;
    }
});