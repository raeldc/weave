var LifeCycleMixin = require('core/components/node/mixins/layout/lifecycle.js'),
    ChangesMixin   = require('core/components/node/mixins/layout/changes.js'),
    NodeActions    = require('core/actions/node.js');

module.exports = React.createClass({
    mixins: [LifeCycleMixin, ChangesMixin],

    render: function() {
        return (
            <div className="root">
                {this.children}

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