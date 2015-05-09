var Nodes       = require('core/stores/nodes.js'),
    LayoutStore = require('core/stores/layout.js'),
    NodeActions = require('core/actions/node.js');

module.exports = React.createClass({
    getInitialState: function() {
        return Nodes.get('placeholder');
    },

    componentDidMount: function() {
        this.subject = LayoutStore.get('drag_subject');
    },

    componentWillUnmount: function() {
        if(LayoutStore.get('drag_subject') === undefined && this.state.sibling != this.subject) {
            Nodes.moveNodeBesideSibling(this.subject, this.state.sibling, this.state.position);
        }
    },

    render: function() {
        return <div className="placeholder">Im a placeholder</div>
    }
});