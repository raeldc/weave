var UICanvasActions      = require('application/actions/canvas.js'),
    UICanvasOverlayMixin = require('application/ui/canvas/overlay/mixin.js');

module.exports = React.createClass({
    mixins: [UICanvasOverlayMixin],    

    getInitialState: function() {
        return {type: 'hover'};
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
        this.stopListeningToMouseOverNode = UICanvasActions.mouseOverNode.listen(this.displayOverlay);
    },

    componentWillUnmount: function() {
        this.stopListeningToMouseOverNode();
        this.stopListeningToMouseOutNode();
    },

    listenToReverseSelection: function() {
        this.stopListeningToMouseOutNode  = UICanvasActions.mouseOutNode.listen(this.hideOverlay);
    },

    stopListeningToReverseSelection: function() {
        this.stopListeningToMouseOutNode();
    }
});