var Nodes = require('core/stores/nodes.js');

module.exports = React.createClass({
    getInitialState: function() {
        return Nodes.get(this.props.node);
    },

    render: function() {
        return <div><h5>Dimensions</h5></div>;
    }
});