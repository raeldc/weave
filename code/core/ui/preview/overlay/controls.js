var LayoutActions        = require('core/actions/layout.js'),
    UINodeActions        = require('core/actions/node.js'),
    PreviewStore          = require('core/stores/layout.js'),
    UIPreviewOverlayMixin = require('core/ui/preview/overlay/mixin.js');

module.exports = React.createClass({
    mixins: [UIPreviewOverlayMixin],    

    getInitialState: function() {
        return {type: 'controls'};
    },

    render: function() {
        var style = {
            left  : this.state.left,
            top   : this.state.top,
            height: this.state.height,
            width : this.state.width
        };

        var className = this.state.visible ? this.state.type : 'hidden';

        return (
            <div className={className} style={style}>
                <a className="btn" onClick={this.deleteNode}>Delete</a>
            </div>
        );
    },

    componentDidMount: function() {
        this.stopListeningToSelectNode = LayoutActions.selectNode.listen(this.displayOverlay);
    },

    componentWillUnmount: function() {
        this.stopListeningSelectNode();
        this.stopListeningUnselectNode();
    },

    listenToReverseSelection: function() {
        this.stopListeningToUnSelectNode = LayoutActions.unSelectNode.listen(this.hideOverlay);
    },

    stopListeningToReverseSelection: function() {
        this.stopListeningToUnSelectNode();
    },

    deleteNode: function(event) {
        var node   = PreviewStore.get('selectedNode');
        var parent = node.parent;

        LayoutActions.unSelectNode();
        LayoutActions.mouseOutNode();
        UINodeActions.deleteNode(node);

        event.stopPropagation();
    }
});