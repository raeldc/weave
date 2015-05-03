var Nodes      = require('core/stores/nodes.js'),
    Changeable = require('core/components/node/mixins/layout/changeable.js');

module.exports = React.createClass({
    mixins: [Changeable],

    getInitialState: function() {
        return Nodes.get(this.props.id);
    },

    render: function() {
        return (
            <div className="content">
                <div className="controls">
                    <h5 className="title">
                        {this.state.text || "Empty Text"}
                        <div className="btn-group pull-right">
                            <button className="btn btn-xs">
                                <i className="fa fa-pencil"></i>
                            </button>
                            <button className="btn btn-xs">
                                    <i className="fa fa-copy"></i>
                                </button>
                            <button className="btn btn-xs">
                                <i className="fa fa-trash"></i>
                            </button>
                        </div>
                    </h5>
                </div>
            </div>
        );
    }
});