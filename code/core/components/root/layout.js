var Nodes       = require('core/stores/nodes.js'),
    Childable   = require('core/components/node/mixins/childable.js'),
    Changeable  = require('core/components/node/mixins/changeable.js'),
    NodeActions = require('core/actions/node.js');

module.exports = React.createClass({
    mixins: [Childable, Changeable],

    getInitialState: function() {
        return Nodes.get(this.props.id);
    },

    render: function() {
        return (
            <div className="root">
                {this.getChildren()}

                <div className="controls add-row">
                    <button className="btn btn-sm" onClick={this.addRow}>Add Row <i className="fa fa-plus" /></button>
                </div>
            </div>
        );
    },

    addRow: function() {
        NodeActions.addChildNode(this.props.id, {
            component: 'row',
            parent   : this.props.id,
            columns  : 4
        });
    }
});