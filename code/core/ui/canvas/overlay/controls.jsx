var UICanvasActions      = require('application/actions/canvas.js'),
    UINodeActions        = require('application/actions/node.js'),
    CanvasStore          = require('application/stores/canvas.js'),
    UICanvasOverlayMixin = require('application/ui/canvas/overlay/mixin.js');

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
                <a className="btn btn-danger btn-xs" onClick={this.deleteNode}><i className="glyphicon glyphicon-trash"></i></a>
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