var LayoutActions = require('core/actions/layout.js');

module.exports = {
    componentDidMount: function() {
        this.stopListeningToSelectNode = LayoutActions.selectNode.listen(this.selectNode);
    },

    componentWillUnmount: function() {
        this.stopListeningToSelectNode();
    },

    selectNode: function(id) {
        if(id === this.props.id) {
            LayoutActions.displaySelectOverlay(React.findDOMNode(this));
        }
    }
}