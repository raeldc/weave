var UICanvasActions      = require('application/actions/canvas.js'),
    UICanvasOverlayMixin = require('application/ui/canvas/overlay/mixin.js');

module.exports = React.createClass({
    mixins: [UICanvasOverlayMixin],    

    getInitialState: function() {
        return {type: 'select'};
    },

    render: function() {
        return (
            <rect className={this.state.type} 
                x={this.state.left} 
                y={this.state.top} 
                height={this.state.height} 
                width={this.state.width} />
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
    }
});