var LayoutActions = require('core/actions/layout.js');

module.exports = {
    componentWillMount: function() {
        this.addEvent('onMouseOver.hoverable', function(event) {
            LayoutActions.mouseOverNode(this.props.id);
            event.stopPropagation();
        });
    },

    componentDidMount: function() {
        this.stopListeningToMouseOverNode = LayoutActions.mouseOverNode.listen(this.hoverNode);
    },

    componentWillUnmount: function() {
        this.stopListeningToMouseOverNode();
    },

    hoverNode: function(id) {
        if(id === this.props.id) {
            LayoutActions.displayHoverOverlay(React.findDOMNode(this));
        }
    }
}