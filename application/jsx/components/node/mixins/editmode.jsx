var Nodes = require('application/stores/nodes.js');

module.exports = {
    componentWillMount: function() {
        if(this.props.editMode) {
            this.nodeProperties.classNames.push('ui-editmode');
        }
    },

    componentWillUpdate: function(nextProps, nextState) {
        if(this.props.editMode) {
            this.nodeProperties.classNames.push('ui-editmode');

            if(this.isText() && nextState.enableEditable) {
                this.nodeProperties.classNames.push('editable');
            }
        }
    },

    componentDidMount: function() {
        if(this.props.editMode) {
            this.stopListeningToNodeChanges = Nodes.getStore(this.props.id).listen(this.renderChanges);
        }
    },

    componentWillUnmount: function() { 
        if(this.props.editMode) {
            this.stopListeningToNodeChanges();
        }
    },

    renderChanges: function() {
        _.extend(this.state, Nodes.get(this.props.id));
        this.forceUpdate();
    }
}