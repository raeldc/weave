var UIActions = require('application/ui/actions.js');
var Nodes     = require('application/stores/nodes.js');
var CONST     = require('application/constants/all.js');

module.exports = React.createClass({
    getInitialState: function() {
        return Nodes.get(this.props.node);
    },

    render: function() {
        return <div><h5>Formatting</h5></div>;
    }
});