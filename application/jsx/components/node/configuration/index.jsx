var Dispatcher = require('application/alchemy/dispatcher.js');
var Nodes      = require('application/stores/nodes.js');
var CONST      = require('application/constants/all.js');

module.exports = React.createClass({
    getInitialState: function() {
        return Nodes.get(this.props.node);
    },

    render: function() {
        var FormElements = [];

        FormElements.push((
            <div className="form-group" key={"textarea-" + this.state.id}>
                <label htmlFor={"textarea-" + this.state.id}>{this.state.id}</label>
                <textarea className="form-control" id={"textarea-" + this.state.id} rows="3" value={this.state.text} onChange={this.onChange} />
            </div>
        ));

        return (
            <form>
                {FormElements}
            </form>
        );
    },

    componentDidMount: function() {
        Nodes.addChangeListener(this.props.node, this.onNodeChanged);
    },

    componentWillUnmount: function() {
        Nodes.removeChangeListener(this.props.node, this.onNodeChanged);
    },

    onChange: function(event) {
        Dispatcher.dispatch({
            action    : CONST.NODE_ACTION_UPDATE_NODE,
            node      : this.props.node,
            properties: {
                text: event.target.value
            }
        });
    },

    onNodeChanged: function() {
        this.setState(Nodes.get(this.props.node));
    }
});