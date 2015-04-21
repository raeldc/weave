var UICanvasActions      = require('core/actions/canvas.js'),
    UINodeActions        = require('core/actions/node.js'),
    CanvasStore          = require('core/stores/canvas.js'),
    UICanvasOverlayMixin = require('core/ui/canvas/overlay/mixin.js');

module.exports = React.createClass({
    mixins: [UICanvasOverlayMixin],    

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
        this.stopListeningToSelectNode = UICanvasActions.selectNode.listen(this.displayOverlay);
    },

    componentWillUnmount: function() {
        this.stopListeningSelectNode();
        this.stopListeningUnselectNode();
    },

    listenToReverseSelection: function() {
        this.stopListeningToUnSelectNode = UICanvasActions.unSelectNode.listen(this.hideOverlay);
    },

    stopListeningToReverseSelection: function() {
        this.stopListeningToUnSelectNode();
    },

    deleteNode: function(event) {
        var node   = CanvasStore.get('selectedNode');
        var parent = node.parent;

        UICanvasActions.unSelectNode();
        UICanvasActions.mouseOutNode();
        UINodeActions.deleteNode(node);

        event.stopPropagation();
    }
});