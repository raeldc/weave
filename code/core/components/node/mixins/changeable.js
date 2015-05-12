var Nodes         = require('core/stores/nodes.js'),
    LayoutActions = require('core/actions/layout.js');

module.exports = {
    shouldComponentUpdate: function(nextProps, nextState) {
        return (
            !_.isEqual(nextState, this.state) || 
            this.props.device !== nextProps.device || 
            (
                typeof this.constructor.shouldComponentUpdate === 'function' && 
                this.constructor.shouldComponentUpdate.call(this, nextProps, nextState)
            )
        )
    },

    componentDidMount: function() {
        this.stopListeningToNodeChanges = Nodes.getStore(this.props.id).listen(this.renderChanges);
    },

    componentDidUpdate: function() { 
        this.stopListeningToNodeChanges();
        this.stopListeningToNodeChanges = Nodes.getStore(this.props.id).listen(this.renderChanges);
    },

    componentWillUnmount: function() { 
        this.stopListeningToNodeChanges();
    },

    renderChanges: function(id) {
        LayoutActions.nodeTouched(this.props.id);
        this.setState(Nodes.get(this.props.id));
    }
}